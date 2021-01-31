import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import { SwitchToggle } from "../../components/SwitchToggle";
import { getList } from "../../utils/requests";
import Container from "../../components/Container/Container";
import pluginId from '../../pluginId';
import { FormattedMessage } from 'react-intl';
import { endPointsQuery } from "../../utils/queryFactory";


export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      liveView: true,
      query: '',
    }

    this.setLiveView = this.setLiveView.bind(this);
    this.liveViewInterval = undefined;
    this.options = {
      scales: {
        yAxes: [ { ticks: { beginAtZero: true } } ],
      },
    }
  }

  setLiveView(value = true) {
    this.setState({ liveView: value });
    this.enableLiveView(value);
  }

  enableLiveView(enabled = true) {
    if (enabled) {
      this.liveViewInterval = setInterval(() => { this.loadGraph() }, 15 *1000)
    } else if (this.liveViewInterval) {
      clearInterval(this.liveViewInterval);
    }
  }

  loadGraph(query = this.state.query) {
    getList(query)
      .then((res) => {
        this.setState({
          data: {
            labels: res.map((record) => {
              if (record) {
                const createdAt = new Date(record.created_at);
                return `${createdAt.getHours()}:${(createdAt.getMinutes() < 10 ? '0' : '') + createdAt.getMinutes() } ${record.method} ${record.url}`
              }
            }),
            datasets: [
              {
                label: '/GET',
                data: res.map((record) => record.responseTime),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              }
            ]
          }
        });
      });
  }

  componentWillUnmount() {
    this.enableLiveView(false);
  }

  componentDidUpdate(prevProp) {
    if (prevProp.query !== this.props.query) {
      const newQuery = endPointsQuery(this.props.query);
      this.setState({ query:  newQuery});
      this.loadGraph(newQuery);
    }
  }

  componentDidMount() {
    this.loadGraph();
    this.enableLiveView(this.state.liveView);
  }

  render() {
    return (
      <div>
        <Container>
          <FormattedMessage id={`${pluginId}.live_view`} />
          <SwitchToggle
            toggleValue={this.state.liveView}
            onValueChange={this.setLiveView}
          />
        </Container>
        <Line data={this.state.data} options={this.options} />
      </div>
    )
  }
}