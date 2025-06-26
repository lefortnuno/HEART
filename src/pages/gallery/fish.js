import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const FishGraph = () => {
  const totalPoints = 500;
  const [displayedPoints, setDisplayedPoints] = useState(0);

  const t = Array.from(
    { length: totalPoints },
    (_, i) => (i * 4 * Math.PI) / totalPoints
  );

  const sqrt8 = Math.sqrt(8);
  const x = t.map((t) => Math.cos(t) + sqrt8 * Math.cos(t / 2));
  const y = t.map((t) => Math.sin(t));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPoints((prev) => {
        if (prev < totalPoints) return prev + 8;
        clearInterval(interval);
        return prev;
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
          line: { color: "green", width: 3 },
          name: "Poisson",
        },
      ]}
      layout={{
        title: {
          text: "x(t) = cos(t) + √8·cos(t/2), y(t) = sin(t)",
          font: { size: 12 },
        },
        xaxis: { zeroline: true, gridcolor: "#ccc" },
        yaxis: { scaleanchor: "x", zeroline: true, gridcolor: "#ccc" },
        showlegend: false,
        margin: { l: 40, r: 40, t: 40, b: 40 },
        annotations: [
          {
            x: 3,
            y: -1.5,
            text: "@Trofel",
            showarrow: false,
          },
        ],
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default FishGraph;
