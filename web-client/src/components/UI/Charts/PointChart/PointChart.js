import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  ScatterSeries,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import { scaleLinear } from "d3-scale";
import { symbolCircle, symbol } from "d3-shape";
import { formatPrefix } from "d3-format";
import { ValueScale } from "@devexpress/dx-react-chart";
import Content from "./Content";

const Point = (props) => (
  <ScatterSeries.Point
    {...props}
    d={symbol()
      .size([20 ** 2])
      .type(symbolCircle)()}
  />
);

const scale = () => scaleLinear();
const modifyDomain = (domain) => {
  return [domain[0], domain[domain.length - 1]];
};

const PointChart = (props) => {
  const { data, title } = props;

  const chartData = data.slice().sort((x, y) => x.date.localeCompare(y.date));

  return (
    <Paper>
      <Chart data={chartData}>
        <ArgumentAxis />
        <ValueScale factory={scale} modifyDomain={modifyDomain} />
        <ValueAxis />

        <ScatterSeries
          valueField="value"
          argumentField="date"
          pointComponent={Point}
          color="#3F51B5"
        />

        <Title text={title} />

        <EventTracker />
        <HoverState />
        <Tooltip contentComponent={Content(chartData)} />
      </Chart>
    </Paper>
  );
};

export default PointChart;
