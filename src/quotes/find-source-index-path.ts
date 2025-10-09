import directoryExists from '../directory-exists.js';
import fileExists from '../file-exists.js';
import path from 'node:path';

export default function findSourceIndexPath(): string {
  const indexFiles = ['index.js', 'index.ts'];
  let foundIndexFile = indexFiles.find(file => fileExists(file));

  if (foundIndexFile) {
    return foundIndexFile;
  }

  const sourceDirectories = ['lib', 'source', 'src'];

  for (const sourceDirectory of sourceDirectories) {
    if (directoryExists(sourceDirectory)) {
      foundIndexFile = indexFiles.find(file => fileExists(path.join(sourceDirectory, file)));

      if (foundIndexFile) {
        return path.join(sourceDirectory, foundIndexFile);
      }
    }
  }

  return '';
}
