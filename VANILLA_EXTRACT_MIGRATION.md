# Installation Instructions

To complete the Vanilla Extract migration, please run these commands in your terminal:

```bash
yarn add @vanilla-extract/css @vanilla-extract/recipes @radix-ui/react-slot
yarn add -D @vanilla-extract/vite-plugin
```

After installation is complete, your Text component will be refactored with:

## Changes Made:

### 1. **vite.config.ts** - Updated
- Added `@vanilla-extract/vite-plugin` to plugins
- Plugin now includes: `[vanillaExtractPlugin(), react()]`

### 2. **src/styles.css.ts** - Created
- Exports `vars` object that maps your CSS custom properties to Vanilla Extract theme variables
- Provides type-safe access to all design tokens
- Links your `tokens.css` variables to the styling system

### 3. **src/components/Text/Text.css.ts** - Created
- Vanilla Extract recipe for Text component variants
- Defines type-safe variants for: size, weight, color, decoration, overflow
- Uses the theme variables from `styles.css.ts`
- Exports `TextVariants` type for TypeScript support

### 4. **src/components/Text/index.tsx** - Refactored
- Now uses Radix UI `Slot` for flexible composition (`asChild` prop)
- Imports and uses Vanilla Extract recipe styles
- Cleaner, more maintainable component code
- No more inline styles or Tailwind classes

### 5. **src/components/Text/text.stories.tsx** - Refactored
- Updated to use new component API
- Added interactive controls for all variants
- Organized stories by feature (sizes, weights, colors, etc.)
- Added stories for: AsChild, Decorations, Overflow, GutterBottom

## Benefits:

✅ **Type-Safe CSS** - Full TypeScript support for styles
✅ **Zero Runtime Overhead** - All CSS compiled at build time
✅ **Better Performance** - No inline styles or dynamic class generation
✅ **Flexible Composition** - Radix UI Slot enables powerful `asChild` pattern
✅ **Maintainable** - Styles live alongside components in `.css.ts` files
✅ **Design Token Integration** - Direct connection to your design system tokens

## Next Steps:

1. Run the installation commands above
2. Start your dev server: `yarn dev`
3. Open Storybook: `yarn storybook`
4. Verify Text component stories work correctly

All type errors should resolve after `@radix-ui/react-slot` is installed.
