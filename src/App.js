import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./component/layout/Navbar";
import About from "./component/pages/About";
import Search from "./component/Search";
import LineChart from "./component/chart/LineChart";
import ShowCase from "./component/layout/ShowCase";
import AiModule from "./component/ai/AiModule";
import AiSearch from "./component/AiSearch";

import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootswatch/dist/darkly/bootstrap.min.css"; // Added this :boom:
import "./App.css";

const App = () => {
  //useEffect(() => onSubmit, []);

  const [loading, setLoading] = useState(false);

  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState([]);

  const [chartData, setChartData] = useState({});

  const [prediction, setPrediction] = useState([]);
  const [training, setTraining] = useState(false);
  const [aiDay, setAiDay] = useState("");

  //const []
  // useEffect(() => {
  //   console.log("useEffect has been called!");
  //   // if (training) {
  //   //   aiCalculation();
  //   // }
  // }, [log]);
  const aiCalculation = () => {
    const brain = require("brain.js");

    const scaleDown = step => {
      // normalize
      console.log("check sacleDown function", Math.min(...open));
      //console.log("check input value: ", step.open);
      return {
        open: parseFloat(step["1. open"]) / Math.min(...open),
        high: parseFloat(step["2. high"]) / Math.min(...high),
        low: parseFloat(step["3. low"]) / Math.min(...low),
        close: parseFloat(step["4. close"]) / Math.min(...close)
      };
    };

    const scaleUp = step => {
      // denormalize
      return {
        open: step.open * Math.min(...open),
        high: step.high * Math.min(...high),
        low: step.low * Math.min(...low),
        close: step.close * Math.min(...close)
      };
    };
    //have to get rawData here.
    const rawData = Object.values(stockData[0]["Time Series (Daily)"]);
    var open = [];
    var high = [];
    var low = [];
    var close = [];

    rawData.forEach(element => {
      open.push(parseFloat(element["1. open"]));
      high.push(parseFloat(element["2. high"]));
      low.push(parseFloat(element["3. low"]));
      close.push(parseFloat(element["4. close"]));
    });

    //

    const scaledData = rawData.map(scaleDown);
    console.log(scaledData);
    const trainingData = [scaledData];

    const net = new brain.recurrent.LSTMTimeStep({
      inputSize: 4,
      hiddenLayers: [10, 10],
      outputSize: 4
    });

    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.04,
      log: stats => console.log(stats)
    });

    //console.log(net.forecast(trainingData, 1).map(scaleUp));
    setPrediction(
      ...prediction,
      net.forecast(trainingData, parseInt(aiDay)).map(scaleUp)
    );
    setTraining(false);
  };

  const enableAI = async e => {
    e.preventDefault();
    setTimeout(() => aiCalculation(), 500);
    setTraining(true);
    console.log("button clicked.");
    //aiCalculation();
    setAiDay("");
  };
  // const output = net.run([1, 0]); // [0.987]

  const onChange = e => {
    e.preventDefault();
    setStockSymbol(e.target.value);
  };
  const onAiChange = e => {
    e.preventDefault();
    setAiDay(e.target.value);
  };
  //const clearInput = () => {};

  //helper function for repeat checking.
  const checkRepeat = (symbol, storedArr) => {
    for (let i = 0; i < storedArr.length; i++) {
      if (storedArr[i]["Meta Data"]["2. Symbol"] === symbol) {
        return true;
      }
    }
    return false;
  };

  const chartSetup = res => {
    const legendArr = [];
    const dataHigh = [];
    const dataOpen = [];
    const dataLow = [];
    const dataClose = [];
    for (let key in res.data["Time Series (Daily)"]) {
      if (
        Object.prototype.hasOwnProperty.call(
          res.data["Time Series (Daily)"],
          key
        )
      ) {
        legendArr.push(key);
        dataHigh.push(
          parseFloat(res.data["Time Series (Daily)"][key]["2. high"])
        );
        dataOpen.push(
          parseFloat(res.data["Time Series (Daily)"][key]["1. open"])
        );
        dataLow.push(
          parseFloat(res.data["Time Series (Daily)"][key]["3. low"])
        );
        dataClose.push(
          parseFloat(res.data["Time Series (Daily)"][key]["4. close"])
        );
      }
    }
    console.log("check legnet array ====>", legendArr);

    const tempDataSetsElement1 = {
      data: dataOpen.reverse(),
      lineTension: 1,
      fill: false,
      label: stockSymbol + "(open)",
      borderColor: random_rgba()
    };
    const tempDataSetsElement2 = {
      data: dataHigh.reverse(),
      lineTension: 1,
      fill: false,
      label: stockSymbol + "(high)",
      borderColor: random_rgba()
    };
    const tempDataSetsElement3 = {
      data: dataLow.reverse(),
      lineTension: 1,
      fill: false,
      label: stockSymbol + "(low)",
      borderColor: random_rgba()
    };
    const tempDataSetsElement4 = {
      data: dataClose.reverse(),
      lineTension: 1,
      fill: false,
      label: stockSymbol + "(close)",
      borderColor: random_rgba()
    };
    //tempDataSets.push(tempDataSetsElement);
    setChartData({
      //datasets is an array of object contains data arr.
      datasets: [
        ...chartData.datasets,
        tempDataSetsElement1,
        tempDataSetsElement2,
        tempDataSetsElement3,
        tempDataSetsElement4
      ],
      labels: legendArr.reverse()
      //lineTension: 0.4
    });
  };

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
  const onSubmit = async e => {
    e.preventDefault();
    //reputation checking
    console.log(checkRepeat(stockSymbol, stockData));
    if (checkRepeat(stockSymbol, stockData)) {
      alert("you already got this stock's data");
    } else {
      setLoading(true);
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=IVKHCGATRAADPEQK`
      );
      console.log("get data:", res);
      if (res.data.hasOwnProperty("Error Message")) {
        alert("Please input a valid stock symbol.");
        setLoading(false);
      } else {
        setStockData([...stockData, res.data]);
        //find newly received data. And push it into charData .
        chartSetup(res);
        setLoading(false);
        setStockSymbol("");
      }
    }
  };

  return (
    <Router>
      <Fragment className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ShowCase} />
          <Route
            path="/features"
            render={props => (
              <Fragment>
                <Search
                  onChange={onChange}
                  onSubmit={onSubmit}
                  symbol={stockSymbol}
                />
                <div className="container">
                  <br />
                  <br />

                  {loading ? (
                    <div>
                      <Spinner animation="border" />
                      {/* <LineChart data={chartData} /> */}
                    </div>
                  ) : (
                    <LineChart data={chartData} />
                  )}
                </div>
                <br />
                <br />
                <h4 className="text-center">AI Predictions</h4>
                <AiSearch
                  onAiChange={onAiChange}
                  onAiSubmit={enableAI}
                  aiDay={aiDay}
                />
                <div className="container">
                  {training ? (
                    <div>
                      <Spinner animation="border" />
                    </div>
                  ) : (
                    <Fragment>
                      <AiModule data={prediction} />
                    </Fragment>
                  )}
                </div>
              </Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
