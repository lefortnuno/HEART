import Plot from "react-plotly.js";

const BezierCurve = () => {
  const totalPoints = 200;
  const tValues = Array.from(
    { length: totalPoints },
    (_, i) => i / (totalPoints - 1)
  );

  // Points de contrôle P0, P1, P2, P3
  const P0 = [-9, -2];
  const P1 = [-2, 10];
  const P2 = [10, 10];
  const P3 = [4, 6];

  // Calculer les points de la courbe
  const x = [];
  const y = [];
  for (let t of tValues) {
    const xt =
      (1 - t) ** 3 * P0[0] +
      3 * (1 - t) ** 2 * t * P1[0] +
      3 * (1 - t) * t ** 2 * P2[0] +
      t ** 3 * P3[0];
    const yt =
      (1 - t) ** 3 * P0[1] +
      3 * (1 - t) ** 2 * t * P1[1] +
      3 * (1 - t) * t ** 2 * P2[1] +
      t ** 3 * P3[1];

    x.push(xt);
    y.push(yt);
  }

  return (
    <Plot
      data={[
        {
          x,
          y,
          type: "scatter",
          mode: "lines",
          name: "Courbe de Bézier",
          line: { color: "orange", width: 3 },
        },
        {
          x: [P0[0], P1[0], P2[0], P3[0]],
          y: [P0[1], P1[1], P2[1], P3[1]],
          type: "scatter",
          mode: "lines+markers",
          name: "Points de contrôle",
          line: { dash: "dot", color: "gray" },
          marker: { color: "black", size: 6 },
        },
      ]}
      layout={{
        title: {
          text: "B(t) = (1−t)³·P₀ + 3(1−t)²t·P₁ + 3(1−t)t²·P₂ + t³·P₃",
          font: { size: 12 },
        },
        xaxis: { title: "x" },
        yaxis: { title: "y", scaleanchor: "x" },
        showlegend: true,
        margin: { l: 40, r: 40, t: 40, b: 40 },
      }}
      config={{ responsive: true, displayModeBar: false }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BezierCurve;
