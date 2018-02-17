import React, { Component } from 'react';
//import d3 from 'd3'
const d3 = require('d3');


// class Axis extends Component {
//     // propTypes: {
//     //     h: React.PropTypes.number,
//     //     axis: React.PropTypes.func,
//     //     axisType: React.PropTypes.oneOf(['x', 'y'])

//     // },

//     componentDidUpdate() { this.renderAxis(); }
//     componentDidMount() { this.renderAxis(); }
//     renderAxis() {
//         //var node = ReactDOM.findDOMNode(this);
//         d3.select(this.node).call(this.props.axis);

//     }
//     render() {

//         var translate = "translate(0," + (this.props.h) + ")";

//         return (
//             <g className="axis" transform={this.props.axisType == 'x' ? translate : ""} >
//             </g>
//         );
//     }

// }

// class Grid extends Component {
//     // propTypes: {
//     //     h: React.PropTypes.number,
//     //     grid: React.PropTypes.func,
//     //     gridType: React.PropTypes.oneOf(['x', 'y'])
//     // },

//     componentDidUpdate() { this.renderGrid(); }
//     componentDidMount() { this.renderGrid(); }
//     renderGrid() {
//         //var node = ReactDOM.findDOMNode(this);
//         d3.select(this.node).call(this.props.grid);
//         //var container = d3.select("node").node().parent;

//     }
//     render() {
//         var translate = "translate(0," + (this.props.h) + ")";
//         return (
//             <g className="y-grid" transform={this.props.gridType == 'x' ? translate : ""}>
//             </g>
//         );
//     }

// }

// Line Component
const Line = ({ scales, data }) => {
    const { xScale, yScale } = scales;
    const line = d3.line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.income))
        .curve(d3.curveMonotoneX);

    const path =
        <path
            d={line(data)}
            stroke="#FFF056"
            strokeWidth="3px"
            fill="none"
        />
    return (
        <g>{path}</g>
    )
}


class LineChart extends Component {

    state = {
        width: this.props.width,
        height: this.props.height
    };

    render() {


        var margin = { top: 5, right: 50, bottom: 20, left: 50 },
            w = this.props.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        var yAxis = d3.axisLeft(y).ticks(5);

        var xAxis = d3.axisBottom(x).tickValues(this.props.data.map(function (d, i) {
                if (i > 0)
                    return d.date;
            }).splice(1))
            .ticks(4);

        var yGrid = d3.axisLeft(y).ticks(5).tickSize(-w, 0, 0).tickFormat("");

        var x = d3.scaleTime()
            .domain(d3.extent(this.props.data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scaleLinear()
            .domain([0, d3.max(this.props.data, function (d) {
                return d.count + 100;
            })])
            .range([h, 0]);

        var line = d3.line()
            .x((d) => { return x(d.date); })
            .y((d) => { return y(d.count);})
            .curve(d3.curveBasis);


        var transform = 'translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                    <g transform={transform}>

                        {/* <Grid h={h} grid={yGrid} gridType="y" /> */}

                        {/* <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x" /> */}
                        <path className="line shadow" d={line(this.props.data)} strokeLinecap="round" />
                    </g>
                </svg>
            </div>
        );
    }
}

export default LineChart;