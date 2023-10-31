import React, { Component } from 'react';
import axios from 'axios';
import $ from "jquery";
import Create from './Create.js';
import {fadeoutAlert} from '../customScript';

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
    this.callAxios(this);
  }

  callAxios = function() {
    axios.get(
      'https://59j2xky5vl.execute-api.us-east-1.amazonaws.com/serverlessAppFunctionHTTP',
    ).then((response)=>{
      this.setState({
        totalCount: "Total Item: " + response.data.Count,
        totalItems: JSON.stringify(response.data.Items, null, 2)
      })
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    // await axios.get(
    //   'https://59j2xky5vl.execute-api.us-east-1.amazonaws.com/serverlessAppFunctionHTTP',
    // ).then((response)=>{
    //   if (response.status == "200") {
    //     this.setState({
    //       res: "Successfully fetched items: " + response
    //     })
    //     console.log(response);
    //   } else {
    //     this.setState({
    //       res: "Error in fetching item: " + response.data.error
    //     })
    //   }
    // }).catch(function (error) {
    //   console.log("Error in fetching item: " + error);
    // });

    await axios.get(
      'https://59j2xky5vl.execute-api.us-east-1.amazonaws.com/serverlessAppFunctionHTTP',
    ).then((response)=>{
      this.setState({
        totalCount: "Total Item: " + response.data.Count,
        totalItems: JSON.stringify(response.data.Items, null, 2)
      })

      //console.log(response.data.Count);
      //console.log(JSON.stringify(response.data.Items));
    });

    // fetch('https://i149bstj8e.execute-api.us-east-1.amazonaws.com/default/serverlessAppFunction2', {
    //   method: 'POST',
    //   header: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(res)
    // });
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(res)
    // }

    fadeoutAlert();
  }

  render() {
    return (
        <>
        <form onSubmit={this.handleSubmit}>
          <div className="col col-lg-2">
              <button type="submit" className="btn btn-outline-secondary">Refresh</button>
          </div>
        </form>
        <br /><br /><div className="customAlert"><b>{this.state.res}</b></div>
        <br /><br /><div className=""><b>{this.state.totalCount}</b></div>
        <div className=""><b><pre>{this.state.totalItems}</pre></b></div>
        </>
    );
  }
}