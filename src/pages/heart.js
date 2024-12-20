import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Template from "../components/template/template";

const HeartGraph = () => {
  // Nombre total de points
  const totalPoints = 500;
  const t = Array.from(
    { length: totalPoints },
    (_, i) => (i * 2 * Math.PI) / (totalPoints - 1)
  );
  const x = t.map((t) => Math.sin(t) ** 3);
  const y = t.map((t) => Math.cos(t) - Math.cos(t) ** 2);

  const [displayedPoints, setDisplayedPoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPoints((prev) => {
        if (prev < totalPoints) {
          return prev + 8; // Augmenter par 8 points à la fois
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 50); // MAJ toutes les 50 ms

    return () => clearInterval(interval);
  }, []);

  return (
    <Template>
      <div
        className="bg-white border-radius-xl mt-4 p-0"
        style={{
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          height: "480px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3 style={{ textAlign: "center" }} className="pt-4 ps-2 pe-2 pb-0">
          Formule magique pour déchiffrer ton cœur ❤
        </h3>
        <Plot
          data={[
            {
              x: x.slice(0, displayedPoints),
              y: y.slice(0, displayedPoints),
              type: "scatter",
              mode: "lines",
              line: { color: "red", width: 2 },
              name: "Cœur",
            },
          ]}
          layout={{
            title: {
              text: "x = sin³(t), y = cos(t) - cos²(t)",
              font: { size: 16 },
            },
            xaxis: {
              title: "axe des x",
              showgrid: true,
              zeroline: true,
              range: [-1.5, 1.5],
            },
            yaxis: {
              title: "axe des y",
              showgrid: true,
              zeroline: true,
              range: [-2, 1.5],
              scaleanchor: "x",
            },
            annotations: [
              { x: 0.5, y: -1.9, text: "@Trofel", showarrow: false },
            ],
            showlegend: false,
            margin: { l: 40, r: 40, t: 40, b: 40 },
          }}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          style={{ width: "100%", height: "100%" }}
        />
        <hr />
      </div>
    </Template>
  );
};

export default HeartGraph;
