// https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework

import toBase64Str from 'utils/base64/toBase64Str';
import fromBase64Str from 'utils/base64/fromBase64Str';

const fs = window.require('fs');
const path = window.require('path');


/* file api */

// https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
const exists = (filePath, callBack) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    callBack(err);
  });
};

// https://stackoverflow.com/questions/16316330/how-to-write-file-if-parent-folder-doesnt-exist
const writeFile = (filePath, content, callBack) => {
  const directoriesStr = path.dirname(filePath);
  const writeFileCallBack = () => {
    fs.writeFile(filePath, content, (err) => {      
      callBack(err);
    });
  }
  exists(directoriesStr, (err) => {
    if (err) {  // directory does not exist
      //console.log(err);
      fs.mkdir(directoriesStr, { recursive: true }, (err) => {    
        if (err) {
          return callBack(err);      
        }    
        writeFileCallBack();
      });      
    } else {  // directory exists
      writeFileCallBack();
    }
  })  
};

const writeFileSync = (filePath, content) => {
  const directoriesStr = path.dirname(filePath);
  if (!fs.existsSync(directoriesStr)) {
    fs.mkdirSync(directoriesStr, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
}

const readFile = (filePath, callBack) => {
  //fs.readFile(filePath, 'utf-8', (err, data) => {
  fs.readFile(filePath, (err, data) => {
    callBack(err, data);
  });
};

const readFileSync = (filePath) => {
  return fs.readFileSync(filePath);
}

const deleteFile = (filePath, callBack) => {
  if (fs.existsSync(filePath)) {
    // File exists deletings
    fs.unlink(filePath, (err) => {
      callBack(err);
    });
  } else {
    callBack(new Error("This file doesn't exist, cannot delete"));
  }
};

const saveChangesToFile = (filepath, content, callBack) => {
  writeFile(filepath, content, callBack);
};

const isDirectorySync = (filePath) => {
  return fs.statSync(filePath).isDirectory();
};

const base64Encode = (filePath, callBack) => {
  readFile(filePath, (err, data) => {
    if (err) {
      callBack(err, null);
    } else {
      callBack(null, toBase64Str(data));
    }
  });
};

// https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally
const base64EncodeSync = (filePath) => {
  // read binary data
  const data = readFileSync(filePath);
  // convert binary data to base64 encoded string
  return toBase64Str(data);
}

const base64Decode = (locationToSaveFile, encodedStr, callBack) => {
  writeFile(locationToSaveFile, 
    fromBase64Str(encodedStr),
    (err) => { callBack(err); })
};

const base64DecodeSync = (locationToSaveFile, encodedStr) => {
  writeFileSync(locationToSaveFile, 
    fromBase64Str(encodedStr));
};

/* end of file api */


/* directory api */

// https://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist
const createDirectoryIfNotExistsSync = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

const readDirectory = (dirPath, callBack) => {
  fs.readdir(dirPath, (error, files) => {
    callBack(error, files);
  });
}

/* end of directory api */


export default {
  // file api
  exists,
  writeFile,
  readFile,
  readFileSync,
  deleteFile,
  saveChangesToFile,
  isDirectorySync,
  base64Encode,
  base64EncodeSync,
  base64Decode,
  base64DecodeSync,

  // directory api
  createDirectoryIfNotExistsSync,
  readDirectory
};
