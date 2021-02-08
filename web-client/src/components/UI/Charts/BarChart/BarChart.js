import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { scaleLinear, scaleLog } from "d3-scale";
import { ValueScale, Animation } from "@devexpress/dx-react-chart";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import PropTypes from "prop-types";

const scale = () => scaleLinear();
const modifyDomain = (data) => (domain) => {
  const sorted = data
    .slice()
    .map((x) => x.value)
    .map(Number)
    .sort((x, y) => x - y);

  return [sorted[0], sorted[sorted.length - 1]];
};

const BarChart = (props) => {
  const { data, title } = props;

  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueScale factory={scale} modifyDomain={modifyDomain(data)} />
        <ValueAxis />

        <BarSeries
          valueField="value"
          argumentField="category"
          color="#3F51B5"
        />

        <Title text={title} />

        <Animation />
        <EventTracker />
        <HoverState />
        <Tooltip />
      </Chart>
    </Paper>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default BarChart;
