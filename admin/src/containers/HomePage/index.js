import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { SwitchToggle } from "../../components/SwitchToggle/";
import Container from "../../components/Container/Container";
import VerticalContainer from "../../components/Container/VerticalContainer";
import { Graph } from "../Graph";
import SpaceBtw from "../../components/FlexBox/SpaceBtw";
import { Select } from '@buffetjs/core';
import { getEndPoints } from "../../utils/requests";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      endPoints: [],
      endPointsArray: [],
      selectedEndPoint: '',
    }

    this.loadEndPoint = this.loadEndPoint.bind(this);
  }

  componentDidMount() {
    getEndPoints()
      .then(({ data }) => {
        data = JSON.parse(data);
        let endPointsArray = data.map((endPoint) => {
          return endPoint.method + ' ' + endPoint.route;
        });

        endPointsArray.unshift('All');

        this.setState({
         endPoints: data,
         endPointsArray: endPointsArray
        });
      })
  }

  loadEndPoint({ target }) {
    this.setState({
      selectedEndPoint: (target.value === 'All') ? '' : target.value,
    });
  }

  render() {
    return (
      <Container>
        <SpaceBtw>
          <h1>
            <FormattedMessage id="store-response-times.name" />
          </h1>
          <SwitchToggle initialValue={true} />
        </SpaceBtw>
        <Grid fluid={true}>
          <Row>
            <Col xs >
              <Graph query={this.state.selectedEndPoint} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={4}>
                <VerticalContainer>
                  <Select
                    name="select"
                    options={this.state.endPointsArray}
                    onChange={this.loadEndPoint}
                    value={this.state.selectedEndPoint}
                  />
                </VerticalContainer>
            </Col>
          </Row>
        </Grid>
      </Container>
    )
  }
};

export default memo(HomePage);
