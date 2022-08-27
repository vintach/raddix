import path from 'path';
import fs from 'fs';

export const createFolder = (route: string, name: string) => {
  try {
    fs.mkdirSync(path.resolve(route, name));
  } catch (e) {
    console.log('Failed to creation folder: ', e);
  }
};

export const createFile = (route: string, name: string, content: string) => {
  try {
    fs.writeFileSync(path.resolve(route, name), content);
  } catch (e) {
    console.log('Failed to creation file: ', e);
  }
};
