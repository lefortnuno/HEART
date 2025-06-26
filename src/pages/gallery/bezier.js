import Plot from "react-plotly.js";

const BezierCurve = () => {
  const totalPoints = 200;
  const tValues = Array.from(
    { length: totalPoints },
    (_, i) => i / (totalPoints - 1)
  );

  const P0 = [-9, -2], P1 = [-2, 10], P2 = [10, 10], P3 = [4, 6];

  const x = [], y = [];
  for (let t of tValues) {
    const xt = (1 - t) ** 3 * P0[0] + 3 * (1 - t) ** 2 * t * P1[0] + 3 * (1 - t) * t ** 2 * P2[0] + t ** 3 * P3[0];
    const yt = (1 - t) ** 3 * P0[1] + 3 * (1 - t) ** 2 * t * P1[1] + 3 * (1 - t) * t ** 2 * P2[1] + t ** 3 * P3[1];
    x.push(xt);
    y.push(yt);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "100%", maxWidth: "600px", height: "400px" }}>
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
              font: { size: 10 },
              x: 0.5,
              xanchor: "center",
              y: 0.95,
              yanchor: "top"
            },
            xaxis: { title: "x" },
            yaxis: { title: "y", scaleanchor: "x" },
            showlegend: true,
            legend: {
              x: 1,
              y: 1,
              xanchor: "right",
              yanchor: "top",
              bgcolor: "rgba(255,255,255,0.7)",
              bordercolor: "lightgray",
              borderwidth: 1
            },
            margin: { l: 40, r: 40, t: 60, b: 40 },
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default BezierCurve;
