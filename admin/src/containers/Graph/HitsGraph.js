import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import dayjs from 'dayjs';
import { getRGBvalues } from '../../utils/helpers';

export default class HitsGraph extends React.Component {
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
  
  loadGraph(datasets = this.props.hitsData.data, showTime = false) {
    this.setState({
      data: {
        labels: datasets[0].map((el) => {
          const date = dayjs(el.date);
          return (showTime) ? date.format('MM/DD HH:mm') : date.format('MM/DD');
        }),
        datasets: datasets.map((dataset, index) => {
          return {
            label: `${dataset[0].method} ${dataset[0].url}`,
            data: dataset.map((el) => el.hits),
            fill: false,
            backgroundColor: dataset[0].color,
            borderColor: `rgba(${getRGBvalues(dataset[0].color)}, 0.5)`,
          }
        })
      }, 
    });
  }
  
  componentDidUpdate(prevProp) {
    const props = this.props;
    if (props.graphData && (prevProp.graphData !== props.graphData)) {
      this.loadGraph(props.graphData.data, props.graphData.showTime);
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