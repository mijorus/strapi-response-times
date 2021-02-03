import React from 'react';
import { FormattedMessage } from 'react-intl';
import VerticalContainer from "../../components/Container/VerticalContainer";
import Graph from "../Graph/HitsGraph";
import { Select } from '@buffetjs/core';
import { countHits } from "../../utils/requests";
import { Grid, Col, Row } from 'react-styled-flexboxgrid';

export default class EndpointsHits extends React.Component {
    constructor() {
        super();
        this.state = {
            endPoints: [],
            endPointsArray: [],
            selectedEndPointValue: '',
        }

        // this.loadEndPoint = this.loadEndPoint.bind(this);
    }

    componentDidMount() {
        countHits()
            .then((res) => {
                this.setState({ selectedEndPointValue: res })
            })
    }

    // loadEndPoint({ target }) {
    //     this.setState({
    //         selectedEndPoint: this.state.endPoints.find((endPoint) => { return endPoint.value === target.value }),
    //         selectedEndPointValue: (target.value === 'All') ? '' : target.value,
    //     });
    // }

    render() {
        return (
            <VerticalContainer>
                <Grid fluid={true}>
                    <Row>
                        <h2>Endpoint hits</h2>
                    </Row>
                    <Row>
                        <Col xs >
                            <Graph hitsData={this.state.selectedEndPointValue} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} lg={4}>
                            <VerticalContainer>
                                {/* <Select
                                    name="select"
                                    options={this.state.endPointsArray}
                                    onChange={this.loadEndPoint}
                                    value={this.state.selectedEndPointValue}
                                /> */}
                            </VerticalContainer>
                        </Col>
                    </Row>
                </Grid>
            </VerticalContainer>
        )
    }
}