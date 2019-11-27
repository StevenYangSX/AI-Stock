import React, { Fragment } from "react";
import BarChart from "../chart/BarChart";
import Spinner from "react-bootstrap/Spinner";
const AiModule = ({ data }) => {
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
  console.log("check datasets:", datasets);
  const dataProp = {
    labels: ["Open", "High", "Low", "Close"],
    datasets: datasets
  };
  return (
    <div>
      {/* {data === undefined ? (
        <p>waiting...</p>
      ) : (
        <h5>{data.map(item => item.low)}</h5>
      )} */}
      <div>
        {/* {data.map((item, index) => {
          //const dataArr = [item.open, item.high, item.low, item.close];
          //const dataSetObj = { data: dataArr };
          //const datasets = [dataSetObj];
          //const labels = ["Open", "High", "Low", "Close"];
          
          return <BarChart data={data} key={index} day={index + 1} />;
        })} */}
        <BarChart data={dataProp} />
      </div>
    </div>
  );
};

export default AiModule;
