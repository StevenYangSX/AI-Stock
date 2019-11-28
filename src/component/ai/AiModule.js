import React from "react";
import BarChart from "../chart/BarChart";

const AiModule = ({ data }) => {
  // useEffect(() => console.log("get called."), [data]);
  const dataArr = data; //array of object containse low high open close
  //const arrLen = dataArr.length; //for legend use.
  const random_rgba = () => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      "1" +
      ")"
    );
  };
  const datasets = [];
  //eslint-disable-next-line
  dataArr.map((item, index) => {
    const color = random_rgba();
    const tempArr = [];
    for (let key in item) {
      tempArr.push(item[key]);
    }
    const dataObj = {
      data: tempArr,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
      hoverBackgroundColor: color,
      hoverBorderColor: color,
      label: `Next: ${index + 1} Day`
    };
    datasets.push(dataObj);
  });
  //console.log("check datasets:", datasets);
  const dataProp = {
    labels: ["Open", "High", "Low", "Close"],
    datasets: datasets
  };
  return (
    <div>
      <BarChart data={dataProp} />
    </div>
  );
};

export default AiModule;
