import React, { Component } from 'react';
import axios from 'axios';
import $ from "jquery";
import { Parser } from "html-to-react";
import {fadeoutAlert, refreshPage, startLoading, endLoading} from '../customScript';
import Read from './Read.js';

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
      'https://i149bstj8e.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction2',
      { create: `${message}` },
    ).then((response)=>{
      if (response.status == "200") {
        this.setState({
          res: [(<span className='alertMsgCreate'>Successfully added item: {message}</span>)],
          message: ""
        })
        this.props.callReadUpdate();
      } else {
        this.setState({
          res: "Error in adding item: " + response.data.error
        })
      }
    }).catch(function (error) {
      console.log("Error in adding item: " + error);
    });
    //$(".alertMsg").show();
    //fadeoutAlert("Create");

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
        {/* <br /><br /><div className="customAlert-create"><b>{(this.state.res)}</b></div> */}
        </>
    );
  }
  
}
