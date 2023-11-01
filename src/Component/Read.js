import React, { Component } from 'react';
import axios from 'axios';
import $ from "jquery";
import Create from './Create.js';
import {fadeoutAlert, startLoading, endLoading} from '../customScript';

export default class Read extends Component {

  constructor(props) {
    super(props);
    this.state = {
      res: '',
      totalCount: '',
      totalItems: '',

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    //this.callAxios = this.callAxios.bind(this);
    //this.callAxios(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  async handleSubmit(event) {
    //event.preventDefault();
    startLoading("readBtn");

    await axios.get(
      'https://59j2xky5vl.execute-api.us-east-1.amazonaws.com/serverlessAppFunctionHTTP',
    ).then((response)=>{
      this.setState({
        totalCount: "Total Item: " + response.data.Count,
        totalItems: JSON.stringify(response.data.Items, null, 2)
      })
    });

    //fadeoutAlert();

    endLoading("readBtn", "Refresh");
  }

  render() {
    return (
        <>
        <form onSubmit={this.handleSubmit}>
          <div className="col col-lg-2">
              <button type="submit" className="btn btn-outline-secondary readBtn">Refresh</button>
          </div>
        </form>
        <br /><br /><div className="customAlert"><b>{this.state.res}</b></div>
        <br /><br /><div className=""><b>{this.state.totalCount}</b></div>
        <div className=""><b><pre>{this.state.totalItems}</pre></b></div>
        </>
    );
  }
}