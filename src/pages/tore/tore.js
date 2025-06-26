import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Template from "../../components/template/template";
import "./tore.css"; // si tu veux externaliser le style

const ToreGraph = () => {
  const [r, setR] = useState(2.1);
  const [R, setBigR] = useState(-5);
  const [tours, setTours] = useState(6);
  const [steps, setSteps] = useState(200);
  const [opacity, setOpacity] = useState(0.6);
  const [displayedPoints, setDisplayedPoints] = useState(0);

  const u = Array.from({ length: steps }, (_, i) => (i * 2 * Math.PI) / (steps - 1));
  const v = Array.from({ length: steps }, (_, i) => (i * 2 * Math.PI) / (steps - 1));

  const x = [], y = [], z = [];
  for (let i = 0; i < u.length; i++) {
    const xRow = [], yRow = [], zRow = [];
    for (let j = 0; j < v.length; j++) {
      const ux = u[i], vv = v[j];
      xRow.push((R + r * Math.cos(vv)) * Math.cos(ux));
      yRow.push((R + r * Math.cos(vv)) * Math.sin(ux));
      zRow.push(r * Math.sin(vv));
    }
    x.push(xRow); y.push(yRow); z.push(zRow);
  }

  const curveV = Array.from({ length: steps }, (_, i) => (i * 2 * Math.PI) / (steps - 1));
  const curveC2 = {
    x: curveV.map(v => (R + r * Math.cos(v)) * Math.cos(tours * v)).slice(0, displayedPoints),
    y: curveV.map(v => (R + r * Math.cos(v)) * Math.sin(tours * v)).slice(0, displayedPoints),
    z: curveV.map(v => r * Math.sin(v)).slice(0, displayedPoints),
    type: "scatter3d",
    mode: "lines",
    line: { color: "#222", width: 6 },
    name: "Courbe C2",
  };

  useEffect(() => {
    setDisplayedPoints(0);
    const interval = setInterval(() => {
      setDisplayedPoints(prev => {
        if (prev < steps) return prev + 4;
        clearInterval(interval);
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [r, R, tours, steps]);

  return (
    <Template>
      <div className="tore-container">
        <h2 className="tore-title">🌀 Visualisation du Tore et sa courbe C2</h2>

        <div className="tore-controls">
          <div className="tore-slider">
            <label>r (petit rayon) : {r.toFixed(1)}</label>
            <input type="range" min={-5} max={5} step={0.1} value={r} onChange={(e) => setR(parseFloat(e.target.value))} />
          </div>
          <div className="tore-slider">
            <label>R (grand rayon) : {R.toFixed(1)}</label>
            <input type="range" min={-5} max={5} step={0.1} value={R} onChange={(e) => setBigR(parseFloat(e.target.value))} />
          </div>
          <div className="tore-slider">
            <label>tours : {tours}</label>
            <input type="range" min={-5} max={200} step={1} value={tours} onChange={(e) => setTours(parseInt(e.target.value))} />
          </div>
          <div className="tore-slider">
            <label>steps : {steps}</label>
            <input type="range" min={20} max={500} step={10} value={steps} onChange={(e) => setSteps(parseInt(e.target.value))} />
          </div>
          <div className="tore-slider">
            <label>opacité : {opacity.toFixed(2)}</label>
            <input type="range" min={0} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} />
          </div>
        </div>

        <Plot
          data={[
            {
              type: "surface",
              x,
              y,
              z,
              surfacecolor: x.map(row => row.map(() => 1)),
              colorscale: [[0, "#007bff"], [1, "#007bff"]],
              cmin: 0,
              cmax: 1,
              showscale: false,
              opacity,
            },
            curveC2,
          ]}
          layout={{
            title: {
              text: "Tore paramétré & Courbe C2 animée",
              font: { size: 18 },
              xref: "paper",
              x: 0.5,
              xanchor: "center",
            },
            scene: {
              xaxis: { title: "X" },
              yaxis: { title: "Y" },
              zaxis: { title: "Z" },
            },
            margin: { l: 0, r: 0, t: 50, b: 0 },
            showlegend: false,
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    </Template>
  );
};

export default ToreGraph;
