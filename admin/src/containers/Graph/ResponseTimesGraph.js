import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import { SwitchToggle } from "../../components/SwitchToggle";
import { getList } from "../../utils/requests";
import Container from "../../components/Container/Container";
import pluginId from '../../pluginId';
import { FormattedMessage } from 'react-intl';
import { endPointsQuery } from "../../utils/queryFactory";
import { getRGBvalues } from "../../utils/helpers";
import dayjs from 'dayjs';


export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      liveView: true,
      query: '',
      defaultGraphColor: 'rgb(255, 99, 132)',
      graphColor: undefined,
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
      this.liveViewInterval = setInterval(() => { this.loadGraph() }, 15 * 1000)
    } else if (this.liveViewInterval) {
      clearInterval(this.liveViewInterval);
    }
  }

  loadGraph(query = this.state.query, lineColor = this.state.graphColor || this.state.defaultGraphColor) {
    getList(query)
      .then((res) => {
        this.setState({
          data: {
            labels: res.map((record) => {
              if (record) return `${dayjs(record.created_at).format('HH:mm')} ${record.method} ${record.url}`
            }),
            datasets: [
              {
                label: 'Response time (ms)',
                data: res.map((record) => record.responseTime),
                fill: false,
                backgroundColor: lineColor,
                borderColor: 'rgba(' + getRGBvalues(lineColor) + ', 0.2)',
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
    // When the users requests a new endpoint,
    // the component loads the new query in the state,
    // saves its random generated color and calls at a regular interval
    if (prevProp.query !== this.props.query) {
      const newQuery = endPointsQuery(this.props.query);
      const newGraphColor = this.props.query ? this.props.query.color : this.state.defaultGraphColor;
      this.setState({ query:  newQuery, graphColor: newGraphColor });
      this.loadGraph(newQuery, newGraphColor);
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