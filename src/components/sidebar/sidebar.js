import { Link, useLocation } from "react-router-dom";
import {
  BsHouseFill,
  BsHeartFill,
  BsImages,
  BsTornado,
} from "react-icons/bs";
import logoTrofel from "../../assets/images/logoTrofel.png";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/home/", label: "Accueil", icon: <BsHouseFill /> },
    { path: "/", label: "Coeur", icon: <BsHeartFill /> },
    { path: "/gallery", label: "Gallery", icon: <BsImages /> },
    { path: "/tore", label: "Tore", icon: <BsTornado /> },
  ];

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <a
          href="https://trofel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ cursor: "pointer" }}
        >
          <img src={logoTrofel} alt="Logo Trofel" />
        </a>
      </div>

      <hr className="horizontal dark mt-0" />

      <div className="collapse navbar-collapse w-auto nySidebar-ko">
        <ul className="navbar-nav">
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              Pages: Utilisateurs
            </h6>
          </li>

          {navItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path;
            return (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link customNavLink ${isActive ? "atato" : ""}`}
                >
                  <div className={`navIcone ${isActive ? "atato" : ""}`}>{icon}</div>
                  <span className={`navText ${isActive ? "atato" : ""}`}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
