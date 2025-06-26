import Plot from "react-plotly.js";

const ImplicitHeart = () => {
  const range = 200;
  const xValues = [];
  const yValues = [];
  const zValues = [];

  for (let i = 0; i < range; i++) {
    const x = -1.5 + (3 * i) / (range - 1);
    xValues.push(x);
  }

  for (let j = 0; j < range; j++) {
    const y = -1.5 + (3 * j) / (range - 1);
    yValues.push(y);

    const row = [];
    for (let i = 0; i < range; i++) {
      const x = xValues[i];
      const value = Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
      row.push(value);
    }
    zValues.push(row);
  }

  return (
    <Plot
      data={[
        {
          z: zValues,
          x: xValues,
          y: yValues,
          type: "contour",
          contours: {
            coloring: "lines",
            showlabels: false,
            start: 0,
            end: 0,
            size: 0.01,
          },
          line: {
            color: "red",
            width: 2,
          },
          showscale: false,
        },
      ]}
      layout={{
        title: {
          text: "(x² + y² − 1)³ = x²y³",
          font: { size: 12 },
        },
        xaxis: { title: "x", scaleanchor: "y", zeroline: true },
        yaxis: { title: "y", zeroline: true },
        margin: { l: 40, r: 40, t: 40, b: 40 },
      }}
      config={{ responsive: true, displayModeBar: false }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ImplicitHeart;
