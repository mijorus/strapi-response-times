import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import { SwitchToggle } from "../../components/SwitchToggle";
import { getResponseTimesList } from "../../utils/requests";
import Container from "../../components/Container/Container";
import pluginId from '../../pluginId';
import { FormattedMessage } from 'react-intl';
import { endPointsQuery } from "../../utils/queryFactory";
import { getRGBvalues } from "../../utils/helpers";
import dayjs from 'dayjs';
import * as ChartJsAnnotation from 'chartjs-plugin-annotation';


export default class ResponseTimesGraph extends React.Component {
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
      annotation: {
        annotations: [
          {
            type: "line",
            mode: 'horizontal',
            scaleID: "y-axis-0",
            value: 80,
            borderColor: "rgb(255, 212, 0)",
            label: {
              backgroundColor: "rgb(255, 127, 0)",
              content: "warning",
              enabled: true
            }
          }
        ]
      }
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
    getResponseTimesList(query)
      .then((res) => {
        this.setState({
          data: {
            labels: res.map((record) => dayjs(record.created_at).format('HH:mm')),
            datasets: [
              {
                label: 'Response time (ms)',
                data: res.map((record) => record.responseTime),
                fill: false,
                backgroundColor: lineColor,
                borderColor: `rgba(${getRGBvalues(lineColor)}, 0.5)`,
              }
            ]
          },
        });
      });
  }

  componentWillUnmount() {
    this.enableLiveView(false);
  }

  // When the users requests a new endpoint,
  // the component loads the new query in the state,
  // saves its random generated color and calls at a regular interval
  componentDidUpdate(prevProp) {
    if (prevProp.graphData !== this.props.graphData) {
      const newQuery = endPointsQuery(this.props.graphData);
      this.setState({ query: newQuery, graphColor: this.props.graphData.color });
      this.loadGraph(newQuery, this.props.graphData.color);
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
        <Line data={this.state.data} options={this.options} plugins={ChartJsAnnotation}/>
      </div>
    )
  }
}