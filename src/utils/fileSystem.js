// https://ourcodeworld.com/articles/read/106/how-to-choose-read-save-delete-or-create-a-file-with-electron-framework

const fs = window.require('fs');


/* file api */

const writeFile = (filepath, content, callBack) => {
  fs.writeFile(filepath, content, (err) => {
    callBack(err);
  });  
};

const readFile = (filepath, callBack) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    callBack(err, data);
  });
};

const deleteFile = (filepath, callBack) => {
  if (fs.existsSync(filepath)) {
    // File exists deletings
    fs.unlink(filepath, (err) => {
      callBack(err);
    });
  } else {
    alert("This file doesn't exist, cannot delete");
  }
};

const saveChangesToFile = (filepath, content, callBack) => {
  writeFile(filepath, content, callBack);
};

const isDirectorySync = (filePath) => {
  return fs.statSync(filePath).isDirectory();
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
  writeFile,
  readFile,
  deleteFile,
  saveChangesToFile,
  isDirectorySync,

  // directory api
  createDirectoryIfNotExistsSync,
  readDirectory
};
