import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = props => {
  return (
    <div>
      <p>Doughnut chart here.</p>
      <Doughnut data={props.data} />
    </div>
  );
};

export default DoughnutChart;
