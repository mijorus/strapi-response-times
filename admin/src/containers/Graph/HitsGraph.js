import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import dayjs from 'dayjs';
import randomColor from 'randomcolor';
import { getRGBvalues } from '../../utils/helpers';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultGraphColor: 'rgb(255, 99, 132)',
      options: {
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
        },
      },
    }
  }
  
  loadGraph(datasets = this.props.hitsData.data, lineColor = this.state.defaultGraphColor, showTime = false) {
    this.setState({
      data: {
        labels: datasets[0].map((el) => {
          const date = dayjs(el.date);
          return (showTime) ? date.format('MM/DD HH:mm') : date.format('MM/DD');
        }),
        datasets: datasets.map((dataset, index) => {
          return {
            label: '# of Hits ' + index,
            data: dataset.map((el) => el.hits),
            fill: false,
            backgroundColor: lineColor,
            // borderColor: 'rgba(' + getRGBvalues(lineColor) + ', 0.7)',
            borderColor: randomColor({ luminosity: 'bright', format: 'rgb' })
          }
        })
      }, 
    });
  }
  
  componentDidUpdate(prevProp) {
    const props = this.props;
    if (props.hitsData && (prevProp.hitsData !== props.hitsData)) {
      this.loadGraph(props.hitsData.data, props.hitsData.graphColor, props.hitsData.showTime);
    }
  }
  
  render() {
    return (
      <div>
        <Line data={this.state.data} options={this.state.options} />
      </div>
    )
  }
}