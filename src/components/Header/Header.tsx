import { Navbar, Nav, Dropdown } from "react-bootstrap";
import web from "./flight.png";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SigningCom from "../SigningCom/SigningCom";
import { useSelector } from "react-redux";
import { AppState } from "../../Redux/AppState";
import AddVacation from "../AddVacation/AddVacation";
import ChartReports from "../ChartReports/ChartReports";
import { useHistory } from "react-router-dom";

export default function Header() {
  const userIsLoggedIn = useSelector((state: AppState) => state.userIsLoggedIn);
  let currentUserState = useSelector(
    (state: AppState) => state.currentUserState
  );

  const history = useHistory();

  function onAboutClicked() {
    history.push("/about");
  }

  function onHomeClicked() {
    history.push("/home");
  }
  function onDealsClicked(){
    history.push("/home");
  }

  return (
    <div className="header">
      <Navbar className="nav-main" bg="white" expand="lg">
        <Navbar.Brand className="nav-title" href="#">
          <img
            className="icon-header"
            src={web}
            alt=""
            style={{ maxHeight: "50px" }}
          />{" "}
          Ultimate Vacations
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" style={{ maxHeight: "130px" }} navbarScroll>
            <Nav.Link onClick={onHomeClicked}>Home</Nav.Link>
            <Nav.Link onClick={onDealsClicked} href="#V">Deals</Nav.Link>
            <Nav.Link onClick={onAboutClicked}>About</Nav.Link>
          </Nav>
          <Navbar.Text>
            {currentUserState === "admin" && (
              <Dropdown title="Manager panel" id="basic-nav-dropdown">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Manager panel
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <AddVacation />
                  <ChartReports />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Navbar.Text>
          import { Navbar, Nav, Dropdown } from "react-bootstrap";
import web from "./flight.png";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import SigningCom from "../SigningCom/SigningCom";
import { useSelector } from "react-redux";
import { AppState } from "../../Redux/AppState";
import AddVacation from "../AddVacation/AddVacation";
import ChartReports from "../ChartReports/ChartReports";
import { useHistory } from "react-router-dom";

export default function Header() {
  const userIsLoggedIn = useSelector((state: AppState) => state.userIsLoggedIn);
  let currentUserState = useSelector(
    (state: AppState) => state.currentUserState
  );

  const history = useHistory();

  function onAboutClicked() {
    history.push("/about");
  }

  function onHomeClicked() {
    history.push("/home");
  }
  function onDealsClicked(){
    history.push("/home");
  }

  return (
    <><head>
      <script src="https://kit.fontawesome.com/30d02876ed.js" crossOrigin="anonymous"></script>
    </head><div className="header">
        <Navbar className="nav-main" bg="white" expand="lg">
          <Navbar.Brand className="nav-title" href="#">
            <img
              className="icon-header"
              src={web}
              alt=""
              style={{ maxHeight: "50px" }} />{" "}
            Ultimate Vacations
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" style={{ maxHeight: "130px" }} navbarScroll>
              <Nav.Link onClick={onHomeClicked}>Home</Nav.Link>
              <Nav.Link onClick={onDealsClicked} href="#V">Deals</Nav.Link>
              <Nav.Link onClick={onAboutClicked}>About</Nav.Link>
            </Nav>
            <Navbar.Text>
              {currentUserState === "admin" && (
                <Dropdown title="Manager panel" id="basic-nav-dropdown">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Manager panel
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <AddVacation />
                    <ChartReports />
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Navbar.Text>

            {!userIsLoggedIn && (
              <Dropdown
                align="end"
                title="Dropdown end"
                id="dropdown-menu-align-end"
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="far fa-user"></i> Account
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu dropleft">
                  <Dropdown.Header>Welcome to Ultimate Vacations</Dropdown.Header>
                  <p className="flyButtons">
                    <span className="signinB">
                      <Login />
                    </span>
                    <span>
                      <Register />
                    </span>
                  </p>
                </Dropdown.Menu>
              </Dropdown>
            )}
            {userIsLoggedIn && <SigningCom />}
          </Navbar.Collapse>
        </Navbar>
      </div></>
  );
}

          {!userIsLoggedIn && (
            <>
              <Login />
              <Register />
            </>
          )}
          {userIsLoggedIn && <SigningCom />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
