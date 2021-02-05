import React from 'react';
import { FormattedMessage } from 'react-intl';
import VerticalContainer from "../../components/Container/VerticalContainer";
import Graph from "../Graph/ResponseTimesGraph";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import EndPointSelector from "../../components/EndPointSelector";

export default class ResponseTimesTab extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEndPointValue: '',
    }
    
    this.loadEndPoint = this.loadEndPoint.bind(this);
  }
  
  loadEndPoint(el) {
    this.setState({ selectedEndPoint: el })
  }
  
  render() {
    return (
      <VerticalContainer>
        <Grid fluid={true}>
          <Row>
            <h2>Endpoint response times</h2>
          </Row>
          <Row>
            <Col xs>
              <Graph query={this.state.selectedEndPoint} />
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