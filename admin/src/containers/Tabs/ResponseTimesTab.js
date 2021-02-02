import React from 'react';
import { FormattedMessage } from 'react-intl';
import VerticalContainer from "../../components/Container/VerticalContainer";
import Graph from "../Graph";
import { Select } from '@buffetjs/core';
import { getEndPoints } from "../../utils/requests";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';

export default class ResponseTimesTab extends React.Component {
    constructor() {
        super();
        this.state = {
            endPoints: [],
            endPointsArray: [],
            selectedEndPointValue: '',
        }

        this.loadEndPoint = this.loadEndPoint.bind(this);
    }

    componentDidMount() {
        getEndPoints()
            .then(({ data }) => {
                data = JSON.parse(data);
                let endPointsArray = data.map((endPoint) => endPoint.value);

                endPointsArray.unshift('All');

                this.setState({
                    endPoints: data,
                    endPointsArray: endPointsArray
                });
            })
    }

    loadEndPoint({ target }) {
        this.setState({
            selectedEndPoint: this.state.endPoints.find((endPoint) => { return endPoint.value === target.value }),
            selectedEndPointValue: (target.value === 'All') ? '' : target.value,
        });
    }

    render() {
        return (
            <VerticalContainer>
                <Grid fluid={true}>
                    <Row>
                        <h2>Endpoint response times</h2>
                    </Row>
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
                                    value={this.state.selectedEndPointValue}
                                />
                            </VerticalContainer>
                        </Col>
                    </Row>
                </Grid>
            </VerticalContainer>
        )
    }
}