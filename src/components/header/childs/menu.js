import { BsGear, BsPower } from "react-icons/bs";
import Trofel from "../../../assets/images/Trofel.png";

export default function Menu() {
  return (
    <>
      <li className="nav-item px-3 d-flex align-items-center">
        <div className="nav-item dropdown">
          <span
            className="profile-pic"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            role="button"
          >
            <span>Menu</span>
          </span>
          <ul
            className="dropdown-menu dropdown-menu-end dropdownProfile px-2 py-3 me-sm-n4"
            aria-labelledby="dropdownMenuButton2"
          >
            <li>
              <div className="user-box">
                <div className="u-img">
                  <img src={Trofel} alt="Profile Picture" />
                </div>
                <div className="u-text">
                  <h5> LEFORT</h5>
                  <span className="btn btn-rounded btn-danger btn-sm">
                    Profile
                  </span>
                  <p> N. Nuno</p>
                </div>
              </div>
            </li>
            <div className="dropdown-divider"></div>
            <span>
              <div className="dropdown-item">
                <BsGear />
                <span>Paramètres</span>
              </div>
            </span>
            <div className="dropdown-item" role="button">
              <BsPower />
              <span>Se déconnecter</span>
            </div>
          </ul>
        </div>
      </li>
    </>
  );
}
