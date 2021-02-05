import React from 'react';
import { FormattedMessage } from 'react-intl';
import VerticalContainer from "../../components/Container/VerticalContainer";
import Graph from "../Graph/HitsGraph";
import { countHits, getEndPoints } from "../../utils/requests";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import EndPointSelector from "../../components/EndPointSelector";

export default class EndpointsHits extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEndPointHits: undefined,
    }
    
    this.loadEndPoint = this.loadEndPoint.bind(this);
  }

  getGraphData(query = {}) {
    countHits(query)
      .then((res) => {
        console.log(res);
        this.setState({ selectedEndPointHits: res })
      })
  }

  componentDidMount() {
    this.getGraphData();
  }
  
  loadEndPoint(el) {
    this.getGraphData({
      'url': el.url,
      'method': el.method
    });
  }
  
  render() {
    return (
      <VerticalContainer>
        <Grid fluid={true}>
          <Row>
            <h2>Endpoint hits</h2>
          </Row>
          <Row>
            <Col xs>
              <Graph hitsData={this.state.selectedEndPointHits} />
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