import { Link, useLocation } from "react-router-dom";
import { BsHouseFill, BsHeartFill } from "react-icons/bs";
import logoTrofel from "../../assets/images/logoTrofel.png";

import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <img src={logoTrofel} alt="Logo Trofel" />
      </div>
      <hr className="horizontal dark mt-0" />
      <div className="collapse navbar-collapse w-auto nySidebar-ko">
        <ul className="navbar-nav">
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              Pages: Utilisateurs
            </h6>
          </li>
          
          <li className="nav-item">
            <Link
              to="/home/"
              className={`nav-link customNavLink ${
                location.pathname === "/home/" ? "atato" : ""
              }`}
            >
              <div
                className={`navIcone ${
                  location.pathname === "/home/" ? "atato" : ""
                }`}
              >
                <BsHouseFill />
              </div>
              <span
                className={`navText ${
                  location.pathname === "/home/" ? "atato" : ""
                }`}
              >
                Accueil
              </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link customNavLink ${
                location.pathname === "/" ? "atato" : ""
              }`}
            >
              <div
                className={`navIcone ${
                  location.pathname === "/" ? "atato" : ""
                }`}
              >
                <BsHeartFill />
              </div>
              <span
                className={`navText ${
                  location.pathname === "/" ? "atato" : ""
                }`}
              >
                Coeur
              </span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              to="/coeur2"
              className={`nav-link customNavLink ${
                location.pathname === "/coeur2" ? "atato" : ""
              }`}
            >
              <div
                className={`navIcone ${
                  location.pathname === "/coeur2" ? "atato" : ""
                }`}
              >
                <BsHeartFill />
              </div>
              <span
                className={`navText ${
                  location.pathname === "/coeur2" ? "atato" : ""
                }`}
              >
                Coeur
              </span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/coeur3"
              className={`nav-link customNavLink ${
                location.pathname === "/coeur3" ? "atato" : ""
              }`}
            >
              <div
                className={`navIcone ${
                  location.pathname === "/coeur3" ? "atato" : ""
                }`}
              >
                <BsHeartFill />
              </div>
              <span
                className={`navText ${
                  location.pathname === "/coeur3" ? "atato" : ""
                }`}
              >
                Coeur
              </span>
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
}
