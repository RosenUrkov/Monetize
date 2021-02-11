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
import Dialog from "../../Dialog/Dialog";

const scale = () => scaleLinear();
const modifyDomain = (data) => (domain) => {
  const sorted = data
    .slice()
    .map((x) => x.value)
    .map(Number)
    .sort((x, y) => x - y);

  return sorted.length === 1
    ? [0, sorted[0]].sort((x, y) => x - y)
    : [sorted[0], sorted[sorted.length - 1]];
};

const BarChart = (props) => {
  const { data, title } = props;

  const tutorialTitle = "Payments to Budget";
  const tutorialDescription =
    "The Payments to Budget chart shows the difference between the payments that you registered and the payments expected in the selected budget. If you received an income that you didn't expected, thats a plus. If you expected a category of expense to be under a certain value and the payments go over it, thats a minus. Your goal is to be 0 - you paid what you expected to pay and you received what you expected to receive!";

  const [shouldShowTutorial, setShouldShowTutorial] = useState(
    !localStorage.getItem("paymentsToBudgetTutorial")
  );

  const closeTutorial = () => {
    localStorage.setItem("paymentsToBudgetTutorial", "closed");
    setShouldShowTutorial(false);
  };

  return (
    <Paper>
      <Dialog
        open={shouldShowTutorial}
        close={closeTutorial}
        title={tutorialTitle}
        description={tutorialDescription}
      />

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
