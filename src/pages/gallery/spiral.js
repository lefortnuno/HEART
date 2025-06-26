import Plot from "react-plotly.js";

const ExponentialSpiral = () => {
  const T = 10;
  const steps = 1000;
  const t = Array.from({ length: steps }, (_, i) => (i * T) / (steps - 1));

  const a = 0.4;
  const b = 1.99;

  const x = t.map((t) => Math.exp(a * t) * Math.cos(b * t));
  const y = t.map((t) => Math.exp(a * t) * Math.sin(b * t));

  return (
    <Plot
      data={[
        {
          x,
          y,
          type: "scatter",
          mode: "lines",
          line: { color: "purple", width: 2 },
          name: "z(t)",
        },
      ]}
      layout={{
        title: {
          text: "z(t) = (eᵗcos(t), eᵗsin(t))",
          font: { size: 12 },
        },
        xaxis: { title: "Re(z)", zeroline: true },
        yaxis: { title: "Im(z)", scaleanchor: "x", zeroline: true },
        showlegend: false,
        margin: { l: 40, r: 40, t: 40, b: 40 },
        annotations: [
          { x: x[0], y: y[0], text: "Début", showarrow: true },
          { x: x.at(-1), y: y.at(-1), text: "Fin", showarrow: true },
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

export default ExponentialSpiral;
