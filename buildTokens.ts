import StyleDictionary from "style-dictionary";
import type { Dictionary, TransformedToken } from "style-dictionary";
import { register, getTransforms } from "@tokens-studio/sd-transforms";
import fs from "fs";
import { fileURLToPath } from "url";

type TokenValue = {
  value: string;
  type: string;
  [key: string]: unknown;
};

type TokenObject = {
  [key: string]: TokenValue | TokenObject;
};

type TokensFile = TokenObject & {
  $metadata?: {
    tokenSetOrder?: string[];
  };
  $themes?: unknown;
};

type TextTokenMap = Map<string, TransformedToken>;

const MOBILE_SET_NAME = "s-responsive/Mobile";
const DESKTOP_SET_NAME = "s-responsive/Desktop";
const OUTPUT_PATH = fileURLToPath(new URL("src/tokens.css", import.meta.url));
const tokensPath = fileURLToPath(new URL("tokens.json", import.meta.url));
const tokens: TokensFile = JSON.parse(fs.readFileSync(tokensPath, "utf8"));

// fixes fontWeight tokens that were exported with the type of "text" due to Figma's setup
function fixFontWeightTypes(
  obj: TokenObject | TokenValue,
  isInFontWeight = false
): void {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  if (isInFontWeight && "type" in obj && obj.type === "text") {
    obj.type = "fontWeight";
  }

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const newIsInFontWeight = key === "fontWeight" || isInFontWeight;
      fixFontWeightTypes(
        obj[key] as TokenObject | TokenValue,
        newIsInFontWeight
      );
    }
  }
}

// checks if a value is a leaf token entry
function isTokenValue(
  value: TokenValue | TokenObject | undefined
): value is TokenValue {
  return Boolean(value && typeof value === "object" && "value" in value);
}

// recursively merges two token objects without losing leaf nodes
function deepMerge(
  target: TokenObject,
  source: TokenObject | undefined
): TokenObject {
  if (!source) {
    return target;
  }

  const result: TokenObject = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      typeof targetValue === "object" &&
      targetValue !== null &&
      !isTokenValue(sourceValue) &&
      !isTokenValue(targetValue)
    ) {
      result[key] = deepMerge(
        targetValue as TokenObject,
        sourceValue as TokenObject
      );
    } else {
      result[key] = sourceValue;
    }
  }

  return result;
}

// reads the token set order from metadata
function getTokenSetOrder(): string[] {
  const order = tokens.$metadata?.tokenSetOrder;
  if (!Array.isArray(order) || order.length === 0) {
    throw new Error("Token set order metadata is missing.");
  }
  return order;
}

// returns each set name up to and including the target set
function getSetNamesUpTo(targetSet: string, order: string[]): string[] {
  const targetIndex = order.indexOf(targetSet);
  if (targetIndex === -1) {
    throw new Error(`Missing token set "${targetSet}" in tokenSetOrder.`);
  }
  return order.slice(0, targetIndex + 1);
}

// merges multiple token sets into a single object
function mergeTokenSets(setNames: string[]): TokenObject {
  return setNames.reduce<TokenObject>((acc, setName) => {
    const currentSet = tokens[setName];
    if (!currentSet || typeof currentSet !== "object") {
      throw new Error(`Token set "${setName}" is not defined.`);
    }
    return deepMerge(acc, currentSet as TokenObject);
  }, {});
}

// builds a Style Dictionary dictionary from a list of set names
async function createDictionaryForSets(
  setNames: string[],
  transforms: string[]
): Promise<Dictionary> {
  const mergedTokens = mergeTokenSets(setNames);
  const sd = new StyleDictionary({
    tokens: mergedTokens,
    platforms: {
      base: {
        transforms,
      },
    },
  });

  await sd.init();
  return sd.getPlatformTokens("base");
}

// converts camel or spaced strings into kebab-case
function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

// converts a token to its css custom property name
function getCssVarName(token: TransformedToken): string {
  const segments = token.path.slice(1).map(toKebabCase);
  return `--text-${segments.join("-")}`;
}

// builds a map of text token keys to their values
function extractTextTokenMap(tokens: TransformedToken[]): TextTokenMap {
  return tokens.reduce<TextTokenMap>((map, token) => {
    if (!Array.isArray(token.path) || token.path[0] !== "text") {
      return map;
    }
    const key = token.path.slice(1).join(".");
    map.set(key, token);
    return map;
  }, new Map());
}

// builds a map of scale token keys to their values
function extractScaleTokenMap(tokens: TransformedToken[]): Map<string, TransformedToken> {
  return tokens.reduce<Map<string, TransformedToken>>((map, token) => {
    if (!Array.isArray(token.path) || token.path[0] !== "options" || token.path[1] !== "Color" || token.path[2] !== "Scale") {
      return map;
    }
    const key = token.path[3];
    map.set(key, token);
    return map;
  }, new Map());
}

// generates css variable output with mobile defaults and desktop overrides
function buildCssOutput(
  mobileTokens: TransformedToken[],
  desktopTokens: TransformedToken[]
): string {
  const mobileMap = extractTextTokenMap(mobileTokens);
  const desktopMap = extractTextTokenMap(desktopTokens);
  const scaleMap = extractScaleTokenMap(mobileTokens);
  const sortedKeys = Array.from(mobileMap.keys()).sort();
  const sortedScaleKeys = Array.from(scaleMap.keys()).sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  const rootLines = sortedKeys.map((key) => {
    const token = mobileMap.get(key);
    if (!token) {
      return null;
    }
    return `  ${getCssVarName(token)}: ${token.value};`;
  });

  // Add scale tokens to root
  const scaleLines = sortedScaleKeys.map((key) => {
    const token = scaleMap.get(key);
    if (!token) {
      return null;
    }
    return `  --scale-${key}: ${token.value};`;
  });

  const desktopOverrideKeys = sortedKeys.filter(
    (key) => key.startsWith("fontSize.") || key.startsWith("lineHeight.")
  );

  const desktopLines = desktopOverrideKeys
    .map((key) => {
      const token = desktopMap.get(key);
      if (!token) {
        return null;
      }
      return `    ${getCssVarName(token)}: ${token.value};`;
    })
    .filter((line): line is string => Boolean(line));

  const lines = [
    "/**",
    " * Do not edit directly, this file was auto-generated.",
    " */",
    "",
    ":root {",
    ...rootLines.filter((line): line is string => Boolean(line)),
    ...scaleLines.filter((line): line is string => Boolean(line)),
    "}",
  ];

  if (desktopLines.length > 0) {
    lines.push(
      "",
      "@media only screen and (min-width: 1025px) {",
      "  :root {",
      ...desktopLines,
      "  }",
      "}"
    );
  }

  lines.push("");
  return lines.join("\n");
}

fixFontWeightTypes(tokens);

// orchestrates generation of css variables from the responsive token sets
async function buildTokens(): Promise<void> {
  await register(StyleDictionary);
  const tokensStudioTransforms = getTransforms();
  const transforms = ["name/kebab", ...tokensStudioTransforms];
  const tokenSetOrder = getTokenSetOrder();
  const mobileSets = getSetNamesUpTo(MOBILE_SET_NAME, tokenSetOrder);
  const desktopSets = getSetNamesUpTo(DESKTOP_SET_NAME, tokenSetOrder);
  const [mobileDictionary, desktopDictionary] = await Promise.all([
    createDictionaryForSets(mobileSets, transforms),
    createDictionaryForSets(desktopSets, transforms),
  ]);

  const cssOutput = buildCssOutput(
    mobileDictionary.allTokens,
    desktopDictionary.allTokens
  );

  fs.writeFileSync(OUTPUT_PATH, cssOutput);
}

buildTokens().catch((error) => {
  console.error(error);
  process.exit(1);
});