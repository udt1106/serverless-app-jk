import React, { Component } from 'react';
import Create from './Component/Create.js';
import Delete from './Component/Delete.js';
import Update from './Component/Update.js';
import Read from './Component/Read.js';
import {CustomScript} from './customScript.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.readRef = React.createRef();
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h2>Create New Item</h2>
          <Create callReadUpdate = { () => this.readRef.current.handleSubmit(new Event('click'))} />
        </div>
        <div className="row justify-content-center">
          <h2>Delete an Item</h2>
          <Delete callReadUpdate = { () => this.readRef.current.handleSubmit(new Event('click'))} />
        </div>
        <div className="row justify-content-center">
          <h2>Update an Item</h2>
          <Update callReadUpdate = { () => this.readRef.current.handleSubmit(new Event('click'))} />
        </div>
        <div className="row justify-content-center">
          <h2>Read Items</h2>
          <Read ref={this.readRef} />
        </div>
      </div>
    );
  }
}

export default App;
