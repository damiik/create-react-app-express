import React, { Component } from 'react';
//import d3 from 'd3'
const d3 = require('d3');


// Line Component
class Axis extends React.Component {

    componentDidMount() { this.renderAxis(); }
    componentDidUpdate() { this.renderAxis(); }

    renderAxis() {

        let axisType = `axis${this.props.orient}`;
        const axis = d3[axisType]()
            .scale(this.props.scale)
            .tickSize(-this.props.tickSize)
            .tickPadding(this.props.padding)
            .ticks(this.props.ticks)
            .tickFormat(this.props.format)

        d3.select(this.axisElement)
        .call(axis)
        .selectAll("text").attr("transform", this.props.labelTranslate)

    }

    render() {

        return (
            <g className={this.props.className} ref={el => this.axisElement = el} transform={this.props.translate}> </g>
        )
    }
}


const XYAxisLineChart = ({ scales, margins, svgDimensions }) => {

    const xAxisProps = {

        orient: 'Bottom',
        translate: `translate(0,${svgDimensions.height - margins.bottom/2})`,
        labelTranslate: "rotate(-45)",
        scale: scales.xScale,
        tickSize: svgDimensions.height - margins.top - margins.bottom,
        ticks: 30,
        className: 'axisBottom',
        padding: 0,
        format: d3.timeFormat("%a %H:%M") 
    }

    const yAxisProps = {

        orient: 'Left',
        translate: `translate(${margins.left},0)`,
        scale: scales.yScale,
        tickSize: svgDimensions.width - margins.left - margins.right,
        ticks: 10,
        className: 'axisLeft',
        padding: 15,
        format: null
    }

    return (<g>
        <Axis {...xAxisProps} />
        <Axis {...yAxisProps} />
    </g>
    )
}
// Line Component
const Line = ({ scales, data, stroke, strokeWidth }) => {

    const { xScale, yScale } = scales;
    const line = d3.line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.count))
        .curve(d3.curveBasis); //curveNatural curveLinear curveBasis curveMonotoneX curveCatmullRom

    return (
        <g>
            <path className="shadow" d={line(data)} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
        </g>
    )
}


const Area = ({ id, scales, data, stroke, svgDimensions, margins }) => {
    const { xScale, yScale } = scales;
    const area = d3.area()
        .x((d) => xScale(d.date))
        .y0(svgDimensions.height - margins.bottom)
        .y1((d) => yScale(d.count))
        .curve(d3.curveBasis)
        //.style("fill", "url(#area-gradient)")// + this.id + ")")
        

    let areaGradient =
        <linearGradient
            id={"area-gradient" + id}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={yScale(0)}
            x2="0"
            y2={yScale(1000)}
        >
            <stop offset="0%" stopColor={stroke} stopOpacity="0.01"></stop>
            <stop offset="100%" stopColor={stroke} stopOpacity="0.2"></stop>
        </linearGradient>

    const path = <path d={area(data)} className="area" style={{ fill: "url(#area-gradient" + id + ")"}}/>
    return (

        <g>{areaGradient}{path}</g>
    )
}

// LineChart Component
const LineChart = ({ id, name, data0, data1, stroke, svgDimensions, margins }) => {

    const xScaleMinValue = (data0.map) ? Math.min(...data0.map(d => d.date)) : 0;
    const xScaleMaxValue = (data0.map) ? Math.max(...data0.map(d => d.date)) : 0;
    const yScaleMinValue = (data0.map) ? Math.min(...data0.map(d => d.count)) : 0;
    const yScaleMaxValue = (data0.map) ? Math.max(...data0.map(d => d.count)) : 0;

    console.log(`xScaleMinValue ${ xScaleMinValue}, yScaleMinValue ${ yScaleMinValue}, xScaleMaxValue ${ xScaleMaxValue}, yScaleMaxValue ${ yScaleMaxValue}`)

    const xScale = d3.scaleLinear()
        .domain([xScaleMinValue, xScaleMaxValue])
        .range([margins.left, svgDimensions.width - margins.right])
        .clamp(true);

    const yScale = d3.scaleLinear()
        .domain([yScaleMinValue, yScaleMaxValue]) //0,yScaleMaxValue
        .range([svgDimensions.height - margins.bottom, margins.bottom])
        .clamp(true);


    return <svg className="lineChartSvg" width={svgDimensions.width} height={svgDimensions.height}>
        <rect
            transform={`translate(${margins.left / 2},${margins.top/2})`}
            className="rectOverlayLineChart"
            width={svgDimensions.width - margins.right}
            height={svgDimensions.height + margins.bottom}
            rx="5"
            ry="5"
        />
        <XYAxisLineChart scales={{ xScale, yScale }} margins={margins} svgDimensions={svgDimensions} />
        <text transform="translate(30,100)rotate(-90)" fontSize="15">{name}</text>
        <Line scales={{ xScale, yScale }} data={data0} stroke={stroke} strokeWidth="3px" />
        <Area scales={{ xScale, yScale }} id = {id} data={data0} stroke={stroke} margins={margins} svgDimensions={svgDimensions} />

    </svg>
}



export default LineChart;


// const Line = ({ scales, data }) => {

//     const { xScale, yScale } = scales;
//     const line = d3.line()
//         .x((d) => xScale(d.year))
//         .y((d) => yScale(d.income))
//         .curve(d3.curveMonotoneX);

//     const path = <path d={line(data)} stroke="#FFF056" strokeWidth="3px" fill="none" />
//     return (
//         <g>{path}</g>
//     )
// }


// class LineChart extends Component {

//     state = {
//         width: this.props.width,
//         height: this.props.height
//     };

//     render() {

//         var margin = { top: 5, right: 50, bottom: 20, left: 50 },
//             w = this.props.width - (margin.left + margin.right),
//             h = this.props.height - (margin.top + margin.bottom);

//         var yAxis = d3.axisLeft(y).ticks(5);

//         var xAxis = d3.axisBottom(x).tickValues(this.props.data.map(function (d, i) {
//             if (i > 0)
//                 return d.date;
//         }).splice(1))
//             .ticks(4);

//         var yGrid = d3.axisLeft(y).ticks(5).tickSize(-w, 0, 0).tickFormat("");

//         var x = d3.scaleTime()
//             .domain(d3.extent(this.props.data, function (d) {
//                 return d.date;
//             }))
//             .rangeRound([0, w]);

//         var y = d3.scaleLinear()
//             .domain([0, d3.max(this.props.data, function (d) {
//                 return d.count + 100;
//             })])
//             .range([h, 0]);

//         var line = d3.line()
//             .x((d) => { return x(d.date); })
//             .y((d) => { return y(d.count); })
//             .curve(d3.curveLinear); //curveMonotoneX curveBasis

//         var transform = 'translate(' + margin.left + ',' + margin.top + ')';

//         return (
//             <div>
//                 <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

//                     <g transform={transform}>

//                         {/* <Grid h={h} grid={yGrid} gridType="y" /> */}

//                         {/* <Axis h={h} axis={yAxis} axisType="y" />
//                         <Axis h={h} axis={xAxis} axisType="x" /> */}
//                         <path className="line shadow" d={line(this.props.data)} strokeLinecap="round" />
//                     </g>
//                 </svg>
//             </div>
//         );
//     }
// }





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



/*
https://github.com/d3/d3-3.x-api-reference/blob/master/Time-Formatting.md
d3.time.format(specifier)
    %a - abbreviated weekday name.
    %A - full weekday name.
    %b - abbreviated month name.
    %B - full month name.
    %c - date and time, as "%a %b %e %H:%M:%S %Y".
    %d - zero-padded day of the month as a decimal number [01,31].
    %e - space-padded day of the month as a decimal number [ 1,31]; equivalent to %_d.
    %H - hour (24-hour clock) as a decimal number [00,23].
    %I - hour (12-hour clock) as a decimal number [01,12].
    %j - day of the year as a decimal number [001,366].
    %m - month as a decimal number [01,12].
    %M - minute as a decimal number [00,59].
    %L - milliseconds as a decimal number [000, 999].
    %p - either AM or PM.
    %S - second as a decimal number [00,61].
    %U - week number of the year (Sunday as the first day of the week) as a decimal number [00,53].
    %w - weekday as a decimal number [0(Sunday),6].
    %W - week number of the year (Monday as the first day of the week) as a decimal number [00,53].
    %x - date, as "%m/%d/%Y".
    %X - time, as "%H:%M:%S".
    %y - year without century as a decimal number [00,99].
    %Y - year with century as a decimal number.
    %Z - time zone offset, such as "-0700".
    %% - a literal "%" character.

*/