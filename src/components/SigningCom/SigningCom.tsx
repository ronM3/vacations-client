import { Navbar, Container } from "react-bootstrap";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../Redux/action-type";
import { AppState } from "../../Redux/AppState";
import Login from "../Login/Login";
import "./SigningCom.css";

function SigningCom() {
  const userName = useSelector((state: AppState) => state.userName);
  let userIsLoggedIn = useSelector((state: AppState) => state.userIsLoggedIn);

  const dispatch = useDispatch();

  function logOut() {
    dispatch({
      type: ActionType.LogOut,
      payload: { userIsLoggedIn },
    });
    userIsLoggedIn = false;
    {
      userIsLoggedIn && <Login />;
    }
  }

  return (
    <div className="signingCom">
      <Container>
        <Navbar.Text className="log-outB">
          <button
            type="button"
            onClick={logOut}
            className="btn btn-outline-secondary"
          >
            <BoxArrowLeft className="log-out-icon" />
            <i className="bi bi-box-arrow-left"></i>
            Log out
          </button>
        </Navbar.Text>
        <Navbar.Text className="userSigned">
          Signed in as: <a href="#login">{userName}</a>
        </Navbar.Text>
      </Container>
    </div>
  );
}

export default SigningCom;
