import React, { Component } from 'react';
import axios from 'axios';
import {fadeoutAlert, startLoading, endLoading} from '../customScript';
import { serverlessAppFunction2 } from '../config';

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
      serverlessAppFunction2(),
      { delete: `${date}` },
    ).then((response)=>{

      var foundItem = response.data;

      console.log("data found: " + foundItem);

      if (!foundItem) {
        this.setState({
          res: "",
          res: [(<span className='alertMsgRed'>Couldn't find the item: <mark>{date}</mark></span>)]
        })
      } else {
        this.setState({
          res: "",
          res: [(<span className='alertMsgGreen'>Successfully deleted item: <mark>{date}</mark></span>)],
          date: ""
        })
      }
      this.props.callReadUpdate();
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
        <br /><br /><div className="customAlert-delete"><b>{this.state.res}</b></div>
        </>
    );
  }
}
