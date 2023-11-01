import React, { Component } from 'react';
import axios from 'axios';
import $ from "jquery";
import {fadeoutAlert, startLoading, endLoading} from '../customScript';

export default class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
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
    const { date } = this.state;

    startLoading("deleteBtn");
    await axios.post(
      'https://i149bstj8e.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction2',
      //'https://8k019bf91e.execute-api.us-east-1.amazonaws.com/serverlessAppFunctionHTTPDelete',
      { delete: `${date}` },
    ).then((response)=>{
      if (response.status == "200") {
        this.setState({
          res: [(<span className='alertMsg'>Successfully deleted item: {date}</span>)],
          date: ""
        })
        this.props.callReadUpdate();
      } else {
        this.setState({
          res: "Error in deleting item: " + `${date}` + response.data.error
        })
      }
    }).catch(function (error) {
      console.log("Error in deleting item: " + error);
    });
    //fadeoutAlert();

    endLoading("deleteBtn", "Delete");
  }

  render() {
    return (
        <>
        <form onSubmit={this.handleSubmit}>
        <div className="col col-lg-10">
            <input type="text" name="date" className="form-control" placeholder="Type unique date" onChange={this.handleChange} value={this.state.date} />
        </div>
        <div className="col col-lg-2">
            <button type="submit" className="btn btn-outline-secondary deleteBtn">Delete</button>
        </div>
        </form>
        {/* <br /><br /><div className="customAlert-delete"><b>{this.state.res}</b></div> */}
        </>
    );
  }
}
