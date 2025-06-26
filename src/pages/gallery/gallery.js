import "./gallery.css";
import Template from "../../components/template/template";
import FishGraph from "./fish";
import ExponentialSpiral from "./spiral";
import PolarCurve from "./polar";
import AstroidGraph from "./asteroide";
import BezierCurve from "./bezier";
import ImplicitHeart from "./impl_heart";
import ParametricSpiral from "./param_spiral";

const Gallery = () => {
  return (
    <Template>
      <div className="gallery-container">
        <h2 className="gallery-title">🎨 Galerie de courbes paramétrées</h2>

        <div className="gallery-row">
          <div className="gallery-block block-40">
            <h4 className="block-title">🐟 Courbe Poisson</h4>
            <FishGraph />
          </div>
          <div className="gallery-block block-40">
            <h4 className="block-title">🔁 Spirale exponentielle </h4>
            <ExponentialSpiral />
          </div>
        </div>

        <div className="gallery-grid">
          <div className="gallery-block">
            <h4 className="block-title">🌸 Courbe polaire </h4>
            <PolarCurve />
          </div>
          <div className="gallery-block">
            <h4 className="block-title">🌟 Astroïde </h4>
            <AstroidGraph />
          </div>
          <div className="gallery-block">
            <h4 className="block-title">🧮 Courbe de Bézier cubique</h4>
            <BezierCurve />
          </div>
        </div>

        <div className="gallery-row">
          <div className="gallery-block block-40">
            <h4 className="block-title">❤️ Courbe implicite </h4>
            <ImplicitHeart />
          </div>
          <div className="gallery-block block-40">
            <h4 className="block-title">🌀 Spirale paramétrée</h4>
            <ParametricSpiral />
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Gallery;
