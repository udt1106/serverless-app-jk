import React, { Component } from 'react';
import axios from 'axios';
import {fadeoutAlert, refreshPage, startLoading, endLoading} from '../customScript';
import { serverlessAppFunction2 } from '../config';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      res: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state.message);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { message } = this.state;

    startLoading("createBtn");
    await axios.post(
      serverlessAppFunction2(),
      { create: `${message}` },
    ).then((response)=>{
      var foundItem = response.data;
      if (!foundItem) {
        this.setState({
          res: "",
          res: [(<span className='alertMsgRed'>Couldn't create the item</span>)]
        })
      } else {
        this.setState({
          res: "",
          res: [(<span className='alertMsgGreen'>Successfully added item: <mark>{message}</mark></span>)],
          message: ""
        })
      }
      this.props.callReadUpdate();
    });
    endLoading("createBtn", "Create");
  }

  render() {
    return (
        <>
        <form onSubmit={this.handleSubmit}>
        <div className="col col-lg-10">
            <input
                type="text"
                name="message"
                className="form-control"
                placeholder="Type your message"
                onChange={this.handleChange}
                value={this.state.message}
            />
        </div>
        <div className="col col-lg-2">
            <button type="submit" className="btn btn-outline-secondary createBtn">Create</button>
        </div>
        </form>
        <br /><br /><div className="customAlert-create"><b>{(this.state.res)}</b></div>
        </>
    );
  }
  
}
