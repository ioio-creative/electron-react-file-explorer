// https://github.com/hokein/electron-sample-apps/tree/master/file-explorer

import fileSystem from 'utils/fileSystem';
const path = window.require('path');


const map = {
  'compressed': ['zip', 'rar', 'gz', '7z'],
  'text': ['txt', 'md', ''],
  'image': ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
  'pdf': ['pdf'],
  'css': ['css'],
  'html': ['html'],
  'word': ['doc', 'docx'],
  'powerpoint': ['ppt', 'pptx'],
  'movie': ['mkv', 'avi', 'rmvb'],
};

let cached = {};

const statSync = (filepath) => {
  const result = {
    name: path.basename(filepath),
    path: filepath
  };

  try {    
    if (fileSystem.isDirectorySync(filepath)) {
      result.type = 'folder';
    } else {
      const ext = path.extname(filepath).substr(1);
      result.type = cached[ext];
      if (!result.type) {
        for (let key in map) {
          if (map[key].includes(ext.toLowerCase())) {
            cached[ext] = result.type = key;
            break;
          }
        }

        if (!result.type)
          result.type = 'blank';
      }
    }
  } catch (e) {
    window.alert(e);
  }

  return result;
};

export default {
  statSync
};
