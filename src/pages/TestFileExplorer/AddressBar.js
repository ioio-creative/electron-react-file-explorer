// https://github.com/hokein/electron-sample-apps/tree/master/file-explorer

import React, { Component } from 'react';

const path = window.require('path');


function PathItem(props) {
  return (
    <li
      className={props.isLastItem ? "active" : ""}
    >
      <a href="#" 
        onClick={() => {
          props.handleItemClickFunc(props.path);
        }}
      >
        {props.name}
      </a>
      {
        !props.isLastItem  &&
        <span className="divider">/</span>
      }          
    </li>
  );  
}

class AddressBar extends Component {
  constructor(props) {
    super(props);

    this.handleAddressBarItemClick = this.handleAddressBarItemClick.bind(this);    
  }

  /* event handlers */

  handleAddressBarItemClick(dirPath) {
    this.props.handleAddressBarItemClickFunc(dirPath);
  }

  /* end of event handlers */

  render() {
    const props = this.props;

    // Split path into separate elements
    const pathItems = path.normalize(props.currentPath).split(path.sep);    
    
    // Customise path items
    const customisedPathItems = pathItems.map((pathItem, idx) => {
      return {
        name: pathItem,
        path: pathItems.slice(0, idx + 1).join(path.sep)
      };
    });
    
    const pathItemRenderers = customisedPathItems.map((pathItem, idx) => {
      return (
        <PathItem key={pathItem.path}
          name={pathItem.name}
          path={pathItem.path}
          isLastItem={idx === pathItems.length - 1}
          handleItemClickFunc={this.handleAddressBarItemClick}
        />
      );
    });

    return (
      <ul id="addressbar" className="breadcrumb">
        {pathItemRenderers}
      </ul>
    );
  }
}

export default AddressBar;