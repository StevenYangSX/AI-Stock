import React from "react";
import { Line } from "react-chartjs-2";
const LineChart = props => {
  return (
    <div>
      <h5>Line Chart goes here.</h5>
      <Line data={props.data} />
    </div>
  );
};

export default LineChart;
