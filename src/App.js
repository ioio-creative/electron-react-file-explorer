import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import TestFileExplorer from 'pages/TestFileExplorer/TestFileExplorer';

import config from 'globals/config';
import fileSystem from 'utils/fileSystem';


// create App Data directory if it does not exist
fileSystem.createDirectoryIfNotExistsSync(config.appDataDirectory);

class App extends Component {
  render() {
    return (
      <div>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <br />          
          <br />
        </div> */}
        <TestFileExplorer />
      </div>
    );
  }
}

export default App;
