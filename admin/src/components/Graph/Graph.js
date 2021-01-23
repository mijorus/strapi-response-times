import Chart from 'chart.js';
import React from 'react';
import Canvas from './Canvas'
import { request } from "strapi-helper-plugin";

export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.graph = React.createRef();
  }

  getData() {
    return request('/store-response-times', { method: 'GET' })
  }

  componentDidMount() {
    this.graph.current.getContext('2d');
    this.getData()
      .then((res) => { 
        new Chart(this.graph.current, {
          type: 'line',
          data: [{
            x: 10,
            y: 20
          }, {
            x: 15,
            y: 10
          }]
        })
      })
  }

  render() {
    return <Canvas ref={this.graph} />
  }
}