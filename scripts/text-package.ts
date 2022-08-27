export const textOfPackage = (name: string) => {
  const proxyPkg = {
    name: `@mark-ui/${name}`,
    version: '0.1.0',
    packageManager: 'yarn@3.2.2',
    license: 'MIT',
    source: 'src/index.ts',
    main: 'dist/index.js',
    module: 'dist/index.module.js',
    types: 'dist/index.d.ts',
    sideEffects: false,
    files: ['dist', 'README.md'],
    scripts: {
      clean: 'rm -rf dist'
    },
    peerDependencies: {
      react: '>=16.8.0',
      'react-dom': '>=16.8.0'
    },
    devDependencies: {
      '@storybook/react': '^6.5.10',
      '@types/react': '^18.0.17'
    }
  };

  return JSON.stringify(proxyPkg, null, 2) + '\n';
};
