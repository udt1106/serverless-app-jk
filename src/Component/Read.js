import React, { Component } from 'react';
import axios from 'axios';
import {fadeoutAlert, startLoading, endLoading, convertUnixTimestamp} from '../customScript';
import { serverlessAppFunctionHTTP } from '../config';



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
    if (event && event.preventDefault) { event.preventDefault(); }
    startLoading("readBtn");

    await axios.get(
      serverlessAppFunctionHTTP(),
    ).then((response)=>{

      //const convertString = JSON.parse(response);
      this.setState({
        totalCount: "Total Item: " + response.data.Count,
        //totalItems: JSON.stringify(response.data.Items, null, 2)
        //totalItems: JSON.parse(response.data.Items)
        //totalItems: JSON.stringify(response.data.Items)
        totalItems: JSON.parse(JSON.stringify(response.data.Items))
      })

      
    });
    //fadeoutAlert();

    endLoading("readBtn", "Refresh");
  }

  render() {
    const valuesArray = this.state.totalItems;
    

    Object.entries(valuesArray).map(([key, value], i) => (
      console.log(value.date.N + " - " + value.message.S)
    ))

    return (
        <>
        <form onSubmit={this.handleSubmit}>
          <div className="col col-lg-2">
              <button type="submit" className="btn btn-outline-secondary readBtn">Refresh</button>
          </div>
        </form>
        <br /><br /><div className="customAlert"><b>{this.state.res}</b></div>
        <br /><br /><div className=""><b>{this.state.totalCount}</b></div>
        {/* <div className=""><b><pre>{this.state.totalItems}</pre></b></div> */
          //console.log("type: " + typeof valuesArray);
          console.log(Object.entries(valuesArray))
        }
        <table className="table table-striped" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th scope="col" className="th-sm-1">#</th>
              <th scope="col" className="th-sm-2">ID</th>
              <th scope="col" className="th-sm-3">Date</th>
              <th scope="col" className="th-sm-4">Message</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.entries(valuesArray).map(([key, value], i) => (
              <tr className="travelcompany-input" key={i+1}>
                <th scope="row">{i+1}</th>
                <td className="input-label-1">{value.date.N}</td>
                <td className="input-label-2">{convertUnixTimestamp(value.date.N)}</td>
                <td className="input-label-3">{value.message.S}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
        </>
    );
    return (<span>Loading...</span>);
  }
}