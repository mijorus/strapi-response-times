import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGraphColor: 'rgb(255, 99, 132)',
      graphColor: undefined,
    }
    
    this.options = {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true } }],
      },
    }
  }
  
  loadGraph(hitsData = this.props.hitsData) {
    this.setState({
      data: {
        labels: hitsData.map((el) => el.date),
        datasets: [
          {
            label: 'Response time (ms)',
            data: hitsData.map((el) => el.hits),
            fill: false,
          }
        ]
      }
    });
  }
  
  componentDidUpdate(prevProp) {
    if (this.props.hitsData && (prevProp.hitsData !== this.props.hitsData)) {
      this.loadGraph(this.props.hitsData)
    }
  }
  
  render() {
    return (
      <div>
        <Line data={this.state.data} options={this.options} />
      </div>
    )
  }
}