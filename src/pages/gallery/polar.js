import { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const PolarCurve = () => {
  const totalPoints = 1000;
  const t = Array.from(
    { length: totalPoints },
    (_, i) => (i * 2 * Math.PI) / totalPoints
  );

  // Choisis ici ta fonction r(t)
  const r = t.map((t) => Math.sin(4 * t));
  // pour changer sa forme on change r
  const r_ = t.map((t) => Math.sin(4 * t)); // ou sin(4t) cos(3t), exp(t), etc.

  const x = r.map((r, i) => r * Math.cos(t[i]));
  const y = r.map((r, i) => r * Math.sin(t[i]));

  const [displayedPoints, setDisplayedPoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPoints((prev) => {
        if (prev < totalPoints) return prev + 20;
        clearInterval(interval);
        return prev;
      });
    }, 20);
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
          name: "courbe",
        },
      ]}
      layout={{
        title: {
          text: "r(t) = sin(4t)",
          font: { size: 12 },
        },
        xaxis: { title: "x", scaleanchor: "y", range: [-1.2, 1.2] },
        yaxis: { title: "y", range: [-1.2, 1.2] },
        margin: { l: 40, r: 40, t: 40, b: 40 },
        showlegend: false,
      }}
      config={{ responsive: true, displayModeBar: false }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PolarCurve;
