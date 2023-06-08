import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

// convert ts config paths to webpack aliases
const convertTsConfigPathsToWebpackAliases = () => {
  const rootDir = path.resolve(__dirname, '../');
  const tsConfig = require('../tsconfig.json');
  const tsConfigPaths: [string, string][] = Object.entries(
    tsConfig.compilerOptions.paths
  );

  return tsConfigPaths.reduce((alias, [realPath, mappedPath]) => {
    alias[realPath] = path.join(rootDir, mappedPath[0]);
    return alias;
  }, {});
};

const config: StorybookConfig = {
  stories: [
    '../packages/**/**/*.stories.mdx',
    '../packages/**/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react-webpack5',
  webpackFinal: async config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        ...convertTsConfigPathsToWebpackAliases()
      }
    }
  })
};

export default config;
