import React from 'react';
import { FormattedMessage } from 'react-intl';
import VerticalContainer from "../../components/Container/VerticalContainer";
import Graph from "../Graph/HitsGraph";
import { countHits } from "../../utils/requests";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import EndPointSelector from "../../components/EndPointSelector";
import { Enumeration } from '@buffetjs/core';
import pluginId from '../../pluginId';
import Container from '../../components/Container/Container';
import dayjs from 'dayjs';

export default class EndpointsHits extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEndPointHits: undefined,
      timeRange: '7 day',
      lastColor: undefined,
      lastQuery: {},
    }
    
    this.loadEndPoint = this.loadEndPoint.bind(this);
    this.setTimeRange = this.setTimeRange.bind(this);
  }

  getGraphData(query = this.state.lastQuery, color = undefined, timeRange = this.state.timeRange) {
    const range = timeRange.split(' ');
    countHits(query, dayjs().subtract(range[0], range[1]))
      .then((res) => {
        this.setState({
          lastQuery: query,
          lastColor: color,
          selectedEndPointHits: { 
            data: res, 
            graphColor: color, 
            showTime: (range[1] === 'hour' ? true : false)},
        });
      })
  }

  componentDidMount() {
    this.getGraphData();
  }
  
  loadEndPoint(el) {
    el ? this.getGraphData({ 'url': el.url, 'method': el.method }, el.color) : this.getGraphData();
  }

  setTimeRange({ target }) {
    this.setState({ timeRange: target.value });
    this.getGraphData(this.state.lastQuery, this.state.lastColor, target.value);
  }
  
  render() {
    return (
      <VerticalContainer>
        <Grid fluid={true}>
          <Row>
            <h2>
              <FormattedMessage id={`${pluginId}.endpoint_hits`} />
            </h2>
          </Row>
          <Row>
            <Container>
              <Enumeration
                name="enumeration"
                onChange={this.setTimeRange}
                options={[
                  {
                    value: '24 hour',
                    label: '24h',
                  },
                  {
                    value: '7 day',
                    label: '7 days',
                  },
                  {
                    value: '14 day',
                    label: '14 days',
                  },
                ]}
                value={this.state.timeRange}
              />
            </Container>
          </Row>
          <Row>
            <Col xs>
              <Graph hitsData={this.state.selectedEndPointHits}/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <VerticalContainer>
                <EndPointSelector
                  onSelection={(el) => this.loadEndPoint(el)}
                />
              </VerticalContainer>
            </Col>
          </Row>
        </Grid>
      </VerticalContainer>
    )
  }
}