import Chart from 'chart.js';
import React from 'react';
import Canvas from './Canvas'

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.graph = React.createRef();
    }

    componentDidMount() {
        this.graph.current.getContext('2d');
    }

    render() {
        return <Canvas ref={this.graph} />
    }
}