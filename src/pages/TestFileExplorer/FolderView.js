// https://github.com/hokein/electron-sample-apps/tree/master/file-explorer

import React, { Component } from 'react';

import mime from 'utils/mime';

import fileSystem from 'utils/fileSystem';
import { getAbsoluteUrlFromRelativeUrl } from 'utils/setStaticResourcesPath';

const path = window.require('path');


function FileItem(props) { 
  const addFocusClass = (existingClass) => 
    (existingClass + (props.isFocus ? " focus" : ""));
  return (
    <div className={addFocusClass("file")}
      onClick={(evnt) => { props.handleClickFunc(evnt, props.idx); }}
      onDoubleClick={() => { props.handledDoubleClickFunc(props.path, mime.statSync(props.path)); }}>
      <div className={addFocusClass("icon")}>
        <img src={getAbsoluteUrlFromRelativeUrl(`fileExplorer/icons/${props.type}.png`)} />
        <div className={addFocusClass("name")}>{props.name}</div>
      </div>
    </div>
  );  
}

class FolderView extends Component {
  constructor(props) {
    super(props);
    
    this.defaultFocusedItemIdx = -1;
    this.oldCurrentPath = "";

    this.state = {
      files: [],
      focusedItemIdx: this.defaultFocusedItemIdx
    };

    this.enumerateDirectory = this.enumerateDirectory.bind(this);

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    this.handleFileItemClick = this.handleFileItemClick.bind(this);
    this.handleFileItemDoubleClick = this.handleFileItemDoubleClick.bind(this);

    this.handleWindowFocus = this.handleWindowFocus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('focus', this.handleWindowFocus);
    this.enumerateDirectory();
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.handleWindowFocus);
  }

  componentDidUpdate() {    
    this.enumerateDirectory();
  }

  enumerateDirectory() {
    const props = this.props;

    if (props.currentPath !== this.oldCurrentPath) {
      fileSystem.readDirectory(props.currentPath, (error, files) => {
        if (error) {
          console.log(error);
          window.alert(error);
          return;
        }

        const customisedFiles = files.map((file) => {
          return mime.statSync(path.join(props.currentPath, file))
        });

        this.setState({
          files: customisedFiles
        });
      });

      this.oldCurrentPath = props.currentPath;
    }
  }

 /* event handlers */

  // Click on blank
  // Note: It's important to have the background <ul> element has height 100%
  handleBackgroundClick() {
    if (this.state.focusedItemIdx !== this.defaultFocusedItemIdx) {
      this.setState({
        focusedItemIdx: this.defaultFocusedItemIdx
      });
    }
  }

  // Click on file
  handleFileItemClick(evnt, fileItemIdx) {
    if (this.state.focusedItemIdx !== this.fileItemIdx) {
      this.setState({
        focusedItemIdx: fileItemIdx
      });
    }
    evnt.stopPropagation();
  }

  // Double click on file
  handleFileItemDoubleClick(filePath, mime) {
    this.props.handleFileItemClickFunc(filePath, mime);
  }

  // Refresh when in focus again
  handleWindowFocus() {
    this.enumerateDirectory();
  }

  /* end of event handlers */

  render() {
    const props = this.props;
    const state = this.state;

    if (state.files.length === 0) {
      return null;
    }    

    const files = state.files.map((file, idx) => {
      return (
        <FileItem key={file.path}
          idx={idx}
          isFocus={state.focusedItemIdx === idx}
          name={file.name}
          type={file.type}
          path={file.path}
          handleClickFunc={this.handleFileItemClick}
          handledDoubleClickFunc={this.handleFileItemDoubleClick}
        />
      );
    });    

    return (
      <ul style={{margin: "5px", height: "100%"}} id="files"
        onClick={this.handleBackgroundClick}>
        {files}
      </ul>
    );
  }
}

export default FolderView;