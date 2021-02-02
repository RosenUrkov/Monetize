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
import { scaleLinear } from "d3-scale";
import { ValueScale } from "@devexpress/dx-react-chart";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import PropTypes from "prop-types";

const scale = () => scaleLinear();
const modifyDomain = (domain) => {
  return [domain[0], domain[domain.length - 1]];
};

const BarChart = (props) => {
  const { data, title } = props;

  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueScale factory={scale} modifyDomain={modifyDomain} />
        <ValueAxis />

        <BarSeries
          valueField="value"
          argumentField="category"
          color="#3F51B5"
        />

        <Title text={title} />

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
