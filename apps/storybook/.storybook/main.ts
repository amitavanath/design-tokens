import type { StorybookConfig } from '@storybook/react-vite';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: [
    '../../../packages/uikit/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links')
  ],
  framework: getAbsolutePath('@storybook/react-vite'),
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());
    
    // Enable automatic JSX runtime
    config.esbuild = {
      ...config.esbuild,
      jsx: 'automatic',
    };
    
    return config;
  },
};

export default config;
