export default function Fotter() {
  return (
    <>
      <footer className="footer mt-4 mb-0 pt-4 pb-3 bg-white">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                <a
                  href="https://www.facebook.com/tendo.lelouch"
                  className="font-weight-bold"
                  target="_blank"
                >
                  © 2024 TROFEL
                </a>{" "}
                - TOUS DROITS RÉSERVÉS.
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a
                    href="http://www.fsr.ac.ma/"
                    className="nav-link text-muted"
                    target="_blank"
                  >
                    F.S.R
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="https://web.facebook.com/EcoleNationaleInformatiqueFianarantsoa"
                    className="nav-link text-muted"
                    target="_blank"
                  >
                    E.N.I
                  </a>
                </li>
                <li className="nav-item cursor-pointer">
                  <a
                    href="https://trofel.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: "pointer" }}
                    className="nav-link text-muted"
                  >
                    APROPOS
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <br />
    </>
  );
}
