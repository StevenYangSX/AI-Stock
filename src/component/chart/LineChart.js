import React from "react";
import { Line } from "react-chartjs-2";
const LineChart = props => {
  return (
    <div>
      <h4 className="text-center">Trend of Last 90 Days</h4>
      <Line data={props.data} />
    </div>
  );
};

export default LineChart;
