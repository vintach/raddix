const fs = require('fs');
const glob = require('tiny-glob');

const readPkgJson = (file: string) => {
  try {
    return fs.readFileSync(`${file}/package.json`).toString('utf-8');
  } catch (error) {
    console.log('Cannot read file', error);
  }
};

const writePkgJson = (file: string, pkgJson: object) => {
  try {
    return fs.writeFileSync(
      `${file}/dist/package.json`,
      Buffer.from(JSON.stringify(pkgJson, null, 2), 'utf-8')
    );
  } catch (error) {
    console.log('Cannot write file', error);
  }
};

const writePackageJson = (file: string) => {
  const pkgJsonRoot = JSON.parse(readPkgJson(file));

  const pkgJsonToDist = {
    name: pkgJsonRoot.name,
    version: pkgJsonRoot.version,
    packageManager: pkgJsonRoot.packageManager,
    license: pkgJsonRoot.license,
    source: pkgJsonRoot.source,
    main: pkgJsonRoot.main.replace('dist/', ''),
    module: pkgJsonRoot.module.replace('dist/', ''),
    types: pkgJsonRoot.types.replace('dist/', ''),
    repository: pkgJsonRoot.repository,
    sideEffects: pkgJsonRoot.sideEffects,
    dependencies: pkgJsonRoot.dependencies,
    peerDependencies: pkgJsonRoot.peerDependencies
  };

  writePkgJson(file, pkgJsonToDist);
};

const generatePackages = async () => {
  const files = await glob('packages/primitives/*');

  files.map((file: string) => {
    writePackageJson(file);
  });
};

generatePackages();
