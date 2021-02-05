import React from 'react';
import { Select } from '@buffetjs/core';
import { getEndPoints } from "../../utils/requests";

export default class EndPointSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endPoints: [],
      endPointsArray: [],
      selectedEndPointValue: '',
    }
      
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    getEndPoints()
      .then((res) => {
        let list = [...res.list]
        list.unshift('All');

        this.setState({
          endPoints: res.response,
          endPointsArray: list,
        });
      })
  }

  handleChange({ target }) {
    const selectedEndPoint = this.state.endPoints.find((endPoint) => endPoint.value === target.value);
    this.props.onSelection(selectedEndPoint);

    this.setState({
      selectedEndPointValue: (target.value === 'All') ? '' : target.value,
    });
  }

  render() {
    return (
      <Select
        name="select"
        onChange={this.handleChange}
        options={this.state.endPointsArray}
        value={this.state.selectedEndPointValue}
      />
    )
  }
}