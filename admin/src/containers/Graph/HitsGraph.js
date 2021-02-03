import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import { SwitchToggle } from "../../components/SwitchToggle";
import { getList } from "../../utils/requests";
import Container from "../../components/Container/Container";
import pluginId from '../../pluginId';
import { FormattedMessage } from 'react-intl';
import { endPointsQuery } from "../../utils/queryFactory";


export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      query: '',
      defaultGraphColor: 'rgb(255, 99, 132)',
      graphColor: undefined,
    }
    
    this.options = {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true } }],
      },
    }
  }
  
  loadGraph(hitsData) {
    console.log(hitsData);
    this.setState({
      data: {
        labels: hitsData.map((el) => {
          return el.date
        }),
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
    if (prevProp.hitsData !== this.props.hitsData) {
      console.log(this.props.hitsData, 'update');
      this.loadGraph(this.props.hitsData)
    }
  }
  
  componentDidMount() {
    // this.loadGraph(this.props.hitsData);
  }
  
  render() {
    return (
      <div>
        <Container>
          <FormattedMessage id={`${pluginId}.live_view`} />
        </Container>
          <Line data={this.state.data} options={this.options} />
      </div>
    )
  }
}