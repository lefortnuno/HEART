import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const AstroidGraph = () => {
  const a = 1; // taille de l'astroïde
  const totalPoints = 500;
  const t = Array.from(
    { length: totalPoints },
    (_, i) => (i * 2 * Math.PI) / (totalPoints - 1)
  );
  const x = t.map((t) => a * Math.pow(Math.cos(t), 3));
  const y = t.map((t) => a * Math.pow(Math.sin(t), 3));

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
          line: { color: "purple", width: 2 },
        },
      ]}
      layout={{
        title: {
          text: "x(t) = a.cos³(t), y(t) = a.sin³(t)",
          font: { size: 12 },
        },
        xaxis: {
          title: "x",
          range: [-1.5, 1.5],
          zeroline: true,
          showgrid: true,
        },
        yaxis: {
          title: "y",
          range: [-1.5, 1.5],
          zeroline: true,
          showgrid: true,
          scaleanchor: "x",
        },
        margin: { l: 40, r: 40, t: 40, b: 40 },
        showlegend: false,
        annotations: [{ x: 0.5, y: -1.4, text: "@Trofel", showarrow: false }],
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default AstroidGraph;
