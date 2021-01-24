import { Line } from '@reactchartjs/react-chart.js'
import React from 'react';
import { SwitchToggle } from "../../components/SwitchToggle";
import { getList } from "../../utils/requests";
import Container from "../../components/Container";
import pluginId from '../../pluginId';
import { FormattedMessage } from 'react-intl';


export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      liveView: true,
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
      this.liveViewInterval = setInterval(() => { this.loadGraph() }, 5000)
    } else if (this.liveViewInterval) {
      clearInterval(this.liveViewInterval);
    }
  }

  loadGraph() {
    getList(30)
      .then((res) => {
        this.setState({
          data: {
            labels: res.map((record) => {
              const created = new Date(record.created_at);
              return `${created.getHours()}:${created.getMinutes()} ${record.url}`
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
        })
      });
  }

  componentWillUnmount() {
    this.enableLiveView(false);
  }

  componentDidMount() {
    this.loadGraph();
    this.enableLiveView(this.state.liveView);
  }

  render() {
    return (
      <div>
        <Line data={this.state.data} options={this.options} />
        <Container>
          <FormattedMessage id={`${pluginId}.live_view`} />
          <SwitchToggle
            toggleValue={this.state.liveView}
            onValueChange={this.setLiveView}
          />
        </Container>
      </div>
    )
  }
}