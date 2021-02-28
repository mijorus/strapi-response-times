import React from 'react';
import { FormattedMessage } from 'react-intl';
import VerticalContainer from "../../components/Container/VerticalContainer";
import ResponseTimesGraph from "../Graph/ResponseTimesGraph";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import EndPointSelector from "../../components/EndPointSelector";
import pluginId from '../../pluginId';
import { InputNumber } from '@buffetjs/core';

export default class ResponseTimesTab extends React.Component {
  constructor() {
    super();
    this.state = {
      postWarn: 200,
      getWarn: 150,
      selectedEndPointValue: '',
    }
  }
  
  render() {
    return (
      <VerticalContainer>
        <Grid fluid={true}>
          <Row>
            <h2>
              <FormattedMessage id={`${pluginId}.response_times`}/>
            </h2>
          </Row>
          <Row>
            <Col xs>
              <ResponseTimesGraph 
                graphData={this.state.graphData} 
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <VerticalContainer>
                <EndPointSelector 
                  onSelection={ (el) => this.setState({ graphData: el }) }
                  selectAll={false}
                />
              </VerticalContainer>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <VerticalContainer>
                <FormattedMessage id="store-response-times.post_request_warn" />
                <InputNumber
                  name='postRequestWarn'
                  onChange={({ target }) => this.setState({ postWarn: target.value })}
                  value={this.state.postWarn}
                />
              </VerticalContainer>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <VerticalContainer>
                <FormattedMessage id="store-response-times.get_request_warn" />
                <InputNumber
                  name='getRequestWarn'
                  onChange={({ target }) => this.setState({ getWarn: target.value })}
                  value={this.state.getWarn}
                />
              </VerticalContainer>
            </Col>
          </Row>
        </Grid>
      </VerticalContainer>
    )
  }  
}