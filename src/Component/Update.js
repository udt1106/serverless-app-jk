import React, { Component } from 'react';
import axios from 'axios';
import $ from "jquery";
import {fadeoutAlert} from '../customScript';

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
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
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { date, message } = this.state;
    await axios.post(
      'https://i149bstj8e.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction2',
      { update: `${date}`, updateMessage: `${message}` },
    ).then((response)=>{
      if (response.status == "200") {
        this.setState({
          res: [(<span className='alertMsg'>Successfully updated item</span>)],
          date: "",
          message: ""
        })
        this.props.callReadUpdate();
      } else {
        this.setState({
          res: "Error in updating item: " + response.data.error
        })
      }
    }).catch(function (error) {
      console.log("Error in updating item: " + error);
    });
    //fadeoutAlert();
  }

  render() {
    return (
        <>
        <form onSubmit={this.handleSubmit}>
        <div className="col col-lg-3">
            <input
                type="text"
                name="date"
                className="form-control"
                placeholder="Type your date"
                onChange={this.handleChange}
                value={this.state.date}
            />
        </div>
        <div className="col col-lg-7">
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
            <button type="submit" className="btn btn-outline-secondary">Update</button>
        </div>
        </form>
        <br /><br /><div className="customAlert-update"><b>{this.state.res}</b></div>
        </>
    );
  }
}