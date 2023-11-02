import React, { Component } from 'react';
import axios from 'axios';
import {fadeoutAlert, startLoading, endLoading} from '../customScript';

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

    startLoading("updateBtn");
    await axios.post(
      'https://i149bstj8e.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction2',
      { update: `${date}`, updateMessage: `${message}` },
    ).then((response)=>{
      var foundItem = response.data;
      if (!foundItem) {
        this.setState({
          res: "",
          res: [(<span className='alertMsgRed'>Couldn't find the item: <mark>{date}</mark></span>)]
        })
      } else {
        this.setState({
          res: "",
          res: [(<span className='alertMsgGreen'>Successfully updated item: <mark>{date}</mark></span>)],
          date: "",
          message: ""
        })
      }
      this.props.callReadUpdate();
    });
    //fadeoutAlert();

    endLoading("updateBtn", "Update");
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
            <button type="submit" className="btn btn-outline-secondary updateBtn">Update</button>
        </div>
        </form>
        <br /><br /><div className="customAlert-update"><b>{this.state.res}</b></div>
        </>
    );
  }
}
