import { textOfPackage } from './text-package';
import { textOfTsConfig } from './text-tsconfig';
import { createFolder, createFile } from './utils';

const createPackage = () => {
  const pathMain: string = 'packages/primitives';

  // create folder main
  createFolder('packages', 'component');

  // create package.json
  createFile(pathMain, 'package.json', textOfPackage('component'));

  // create tsconfig.json
  createFile(pathMain, 'tsconfig.json', textOfTsConfig());

  // create README
  createFile(pathMain, 'README.md', '# react-component');

  // create folders of work
  createFolder(pathMain, 'src');
  createFolder(pathMain, 'stories');
  createFolder(pathMain, 'tests');

  console.log('✅ Successful creation');
};

createPackage();
