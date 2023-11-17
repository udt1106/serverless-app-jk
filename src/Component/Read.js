import React, { Component } from 'react';
import axios from 'axios';
import {fadeoutAlert, startLoading, endLoading, convertUnixTimestamp} from '../customScript';
import { serverlessAppFunctionHTTP } from '../config';
import $ from 'jquery';

export default class Read extends Component {

  constructor(props) {
    super(props);

    this.state = {
      res: '',
      totalCount: '',
      totalItems: '',
      sort: 'ASC',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleSubmit();
  }

  // handleSort() {

  //   console.log("button test" + this.value);

  //   if ($('button .dateSort').text() == "Sort") { 
  //     ('button .dateSort').text("No Sort"); 
  //   } else { 
  //     $('button .dateSort').text("Sort"); 
  //   }; 
  //   // this.handleSubmit();
  // }

  changeText = (sort) => {

    if (this.state.sort == "DESC") {
      sort = "ASC";
    } else {
      sort = "DESC";
    }
    this.setState({ sort });
    this.state.sort = sort;
    this.handleSubmit();
  }

  async handleSubmit(event) {
    //event.preventDefault();

    console.log("Final: " + this.state.sort);

    if (event && event.preventDefault) { event.preventDefault(); }
    startLoading("readBtn");

    await axios.get(
      serverlessAppFunctionHTTP(this.state.sort),
    ).then((response)=>{
      this.setState({
        totalCount: "Total Item: " + response.data.Count,
        totalItems: JSON.parse(JSON.stringify(response.data.Items)),
        sort: this.state.sort
      })
    });
    //fadeoutAlert();

    endLoading("readBtn", "Refresh");
  }

  render() {
    const valuesArray = this.state.totalItems;
    const { sort } = this.state.sort;
    
    // Object.entries(valuesArray).map(([key, value], i) => (
    //   console.log("test" + value.date + " - " + value.message)
    // ))

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
          //console.log("type: " + typeof valuesArray)
          //console.log(Object.entries(valuesArray))
        }
        <table className="table table-striped" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th scope="col" className="th-sm-1">#</th>
              <th scope="col" className="th-sm-2">ID</th>
              <th scope="col" className="th-sm-3">Date <button style={{float: 'right', 'margin-right': '105px'}} className="dateSort" onClick={ () => { this.changeText(sort)} }> Sort </button></th>
              <th scope="col" className="th-sm-4">Message</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.entries(valuesArray).map(([key, value], i) => (
              <tr className="travelcompany-input" key={i+1}>
                <th scope="row">{i+1}</th>
                <td className="input-label-1">{value.date}</td>
                <td className="input-label-2">{convertUnixTimestamp(value.date)}</td>
                <td className="input-label-3">{value.message}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
        </>
    );
  }
}