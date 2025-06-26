import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const ParametricSpiral = () => {
  const T = 30; // Valeur maximale de t
  const totalPoints = 600;
  const t = Array.from(
    { length: totalPoints },
    (_, i) => (i * T) / (totalPoints - 1)
  );
  const x = t.map((t) => (t * Math.cos(t)) / 5);
  const y = t.map((t) => (t * Math.sin(t)) / 10);

  //   const x = t.map((t) => (t * Math.cos(t)) / 5 + a); a varie de -5,+5
  //   const y = t.map((t) => (t * Math.sin(t)) / 10 + b); b varie de -5,+5

  const [displayedPoints, setDisplayedPoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPoints((prev) => {
        if (prev < totalPoints) {
          return prev + 8;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <Plot
      data={[
        {
          x: x.slice(0, displayedPoints),
          y: y.slice(0, displayedPoints),
          type: "scatter",
          mode: "lines",
          line: { color: "royalblue", width: 2 },
        },
      ]}
      layout={{
        title: {
          text: "F(t) = (t·cos(t)/5, t·sin(t)/10)",
          font: { size: 12 },
        },
        xaxis: {
          title: "X(t) = t·cos(t)/5",
          zeroline: true,
          showgrid: true,
        },
        yaxis: {
          title: "Y(t) = t·sin(t)/10",
          zeroline: true,
          showgrid: true,
          scaleanchor: "x",
        },
        margin: { l: 40, r: 40, t: 40, b: 40 },
        showlegend: false,
        annotations: [{ x: 0, y: -T / 10, text: "@Trofel", showarrow: false }],
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ParametricSpiral;
