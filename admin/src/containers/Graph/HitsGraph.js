import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import dayjs from 'dayjs';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGraphColor: 'rgb(255, 99, 132)',
    }
    
    this.options = {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true } }],
      },
    }
  }
  
  loadGraph(hitsData = this.props.hitsData.data, lineColor = lineColor || this.state.defaultGraphColor) {
    this.setState({
      data: {
        labels: hitsData.map((el) => dayjs(el.date).format('MM/DD')),
        datasets: [
          {
            label: '# of Hits',
            data: hitsData.map((el) => el.hits),
            fill: false,
            backgroundColor: lineColor,
            borderColor: 'rgba(' + (/\(([^)]+)\)/.exec(lineColor))[1] + ', 0.2)',
          }
        ]
      }
    });
  }
  
  componentDidUpdate(prevProp) {
    const props = this.props;
    if (props.hitsData && (prevProp.hitsData !== props.hitsData)) {
      this.loadGraph(props.hitsData.data, props.hitsData.graphColor);
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