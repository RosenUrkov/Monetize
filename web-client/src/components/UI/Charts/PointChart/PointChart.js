import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
  ScatterSeries,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import { scaleLinear } from "d3-scale";
import { symbolCircle, symbol } from "d3-shape";
import { formatPrefix } from "d3-format";
import { ValueScale, Animation } from "@devexpress/dx-react-chart";
import Content from "./Content";
import PropTypes from "prop-types";

const Point = (props) => (
  <ScatterSeries.Point
    {...props}
    d={symbol()
      .size([20 ** 2])
      .type(symbolCircle)()}
  />
);

const scale = () => scaleLinear();
const modifyDomain = (data) => (domain) => {
  const sorted = data
    .slice()
    .map((x) => x.value)
    .map(Number)
    .sort((x, y) => x - y);

  return [0, sorted[sorted.length - 1]];
};

const PointChart = (props) => {
  const { data, title } = props;

  const chartData = data.slice().sort((x, y) => x.date.localeCompare(y.date));

  return (
    <Paper>
      <Chart data={chartData}>
        <ValueScale factory={scale} modifyDomain={modifyDomain(data)} />
        <ArgumentAxis />
        <ValueAxis />

        <ScatterSeries
          valueField="value"
          argumentField="date"
          pointComponent={Point}
          color="#3F51B5"
        />

        <SplineSeries valueField="value" argumentField="date" color="#F50057" />

        <Title text={title} />

        <Animation />
        <EventTracker />
        <HoverState />
        <Tooltip contentComponent={Content(chartData)} />
      </Chart>
    </Paper>
  );
};

PointChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default PointChart;
