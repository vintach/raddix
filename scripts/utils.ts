import path from 'path';
import fs from 'fs';

export const createFolder = (route: string, name: string) => {
  try {
    fs.mkdirSync(path.resolve(route, name));
  } catch (e) {
    console.log('Failed to creation folder: ', e);
  }
};
