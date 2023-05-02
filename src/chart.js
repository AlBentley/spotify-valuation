import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  Hint,
  AreaSeries,
  LineSeries
} from "react-vis";

const ChartDataPast = () => {
  const data = [
    { x: 2015, y: 76.8 },
    { x: 2016, y: 132.6 },
    { x: 2017, y: 198.6 },
    { x: 2018, y: 278 },
    { x: 2019, y: 304.9 },
    { x: 2020, y: 450 }
  ];
  return data;
};

const ChartDataFuture = (growth) => {
  const data = [];
  for (let years = 0; years < 10; years++) {
    // Runs 5 times, with values of step 0 through 4.
    data.push({ x: 2020 + years, y: 450 * Math.pow(growth, years) });
  }

  return data;
};

const ChartDataFreePast = () => {
  const data = [
    { x: 2015, y: 91 },
    { x: 2016, y: 123 },
    { x: 2017, y: 160 },
    { x: 2018, y: 207 },
    { x: 2019, y: 271 },
    { x: 2020, y: 345 }
  ];
  return data;
};

const ChartDataSubsPast = () => {
  const data = [
    { x: 2015, y: 28 },
    { x: 2016, y: 48 },
    { x: 2017, y: 71 },
    { x: 2018, y: 96 },
    { x: 2019, y: 124 },
    { x: 2020, y: 158 }
  ];
  return data;
};

const ChartDataSubsFuture = (growth, share) => {
  const data = [{ x: 2020, y: 158 }];
  for (let years = 1; years < 10; years++) {
    var shareInterp = 35 + (share - 35) * (years / 9);
    data.push({
      x: 2020 + years,
      y: 450 * Math.pow(growth, years) * (shareInterp / 100)
    });
  }

  return data;
};

// Finally we'll embed it all in an SVG
function MusicSubs(props) {
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={ChartDataPast()}
      />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={ChartDataFuture(props.growth)}
      />
      <Hint
        style={{
          fontSize: 14,
          color: "#f50057"
        }}
        value={{ x: 2030, y: 450 * Math.pow(props.growth, 10) }}
      >
        <div className="custom-hint">
          {(450 * Math.pow(props.growth, 10)).toFixed(0)}m,{" "}
          {((450 * Math.pow(props.growth, 10)) / 450).toFixed(1)}x as many today
        </div>
      </Hint>
    </XYPlot>
  );
}

function PaidSubs(props) {
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={ChartDataSubsPast()}
      />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={ChartDataSubsFuture(props.growth, props.share)}
      />
      <Hint
        style={{
          fontSize: 14,
          color: "#f50057"
        }}
        value={{ x: 2030, y: props.subs2030 }}
      >
        <div className="custom-hint">
          {props.subs2030.toFixed(0)}m, {(props.subs2030 / 158).toFixed(1)}x as
          many today
        </div>
      </Hint>
    </XYPlot>
  );
}

export { MusicSubs, PaidSubs };
