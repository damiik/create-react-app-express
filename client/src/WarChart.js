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
        translate: `translate(0,${svgDimensions.height - margins.bottom / 2})`,
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

// Bars Component
const Bars = ({ scales, data, stroke, strokeWidth }) => {

    const { xScale, yScale } = scales;
    const line = d3.line()
        .x((d) => xScale(d.date))
        .y((d) => yScale(d.count))
        .curve(d3.curveBasis); //curveNatural curveLinear curveBasis curveMonotoneX curveCatmullRom

    return (
        <g>
            {/* bars = svg.selectAll('rect').data(data)
        bars.enter().append('rect').attrs({

                x: (d) => scaleX(d.date),
            y: (d) => scaleY(d.price),
            height: (d) => 5,//scaleHeight(d.price),
            //width: scaleX(maxDate)/(data.length-1) - 5,
            width: (d) => scaleAmount(d.amount),
            stroke: '#00ff00',
            fill: '#103010',
            'stroke-width': '3px'
            //'stroke-dasharray': [5, 1]
            //transform: (d, i) => 'translate(' + i*25 + ', 0)',
        }) */}
        </g>
    )
}



// LineChart Component
const WarChart = ({ id, name, data0, stroke, svgDimensions, margins }) => {

    const xScaleMinValue = (data0.map) ? Math.min(...data0.map(d => d.T)) : 0;
    const xScaleMaxValue = (data0.map) ? Math.max(...data0.map(d => d.T)) : 0;
    const yScaleMinValue = (data0.map) ? Math.min(...data0.map(d => d.p)) : 0;
    const yScaleMaxValue = (data0.map) ? Math.max(...data0.map(d => d.p)) : 0;

    const minAmount = (data0.map) ? Math.min(...data0.map(d => d.q)) : 0;
    const maxAmount = (data0.map) ? Math.max(...data0.map(d => d.q)) : 0;

    //console.log(JSON.stringify(data0))

    const xScale = d3.scaleLinear()
        .domain([xScaleMinValue, xScaleMaxValue])
        .range([margins.left, svgDimensions.width - margins.right])
        .clamp(true);

    const yScale = d3.scaleLinear()
        .domain([yScaleMinValue, yScaleMaxValue]) //0,yScaleMaxValue
        .range([svgDimensions.height - margins.bottom, margins.bottom])
        .clamp(true);

    const scaleAmount = d3.scaleLinear().domain([minAmount, maxAmount]).range([5, 100]);

    return <svg className="lineChartSvg" width={svgDimensions.width} height={svgDimensions.height}>
        <rect
            transform={`translate(${margins.left / 2},${margins.top / 2})`}
            className="rectOverlayLineChart"
            width={svgDimensions.width - margins.right}
            height={svgDimensions.height + margins.bottom}
            rx="5"
            ry="5"
        />
        <XYAxisLineChart scales={{ xScale, yScale }} margins={margins} svgDimensions={svgDimensions} />
        <text transform="translate(30,100)rotate(-90)" fontSize="15">{name}</text>


    </svg>
}



export default WarChart;
