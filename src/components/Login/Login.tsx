import { ChangeEvent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./login.css";
import { useDispatch } from "react-redux";
import { ActionType } from "../../Redux/action-type";
import axios from "axios";
import { Exclamation } from "react-bootstrap-icons";
import { io } from "socket.io-client";

export default function Login() {
  const [show, setShow] = useState(false);
  let [isSignedUp, setIsSignedUp] = useState(false);
  const [validDetails, setValidDetails] = useState(false);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const onLoginClicked = async () => {
    try {
      let userRequestBody = {
        userName: userName,
        password: password,
      };

      if (password == "" || userName == "") {
        setValidDetails(true);
        setTimeout(() => {
          setValidDetails(false);
        }, 3000);
        return false;
      }
      const response = await axios.post(
        "http://localhost:3001/users/login",
        userRequestBody
      );
      const token: string = response.data.token;
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("userType", response.data.userType);
      sessionStorage.setItem("userID", response.data.userID);

      axios.defaults.headers.common["Authorization"] = "Bearer " + `${token}`;

      dispatch({
        type: ActionType.InitUserData,
        payload: {
          token: response.data.token,
          userName,
          userType: response.data.userType,
        },
      });
      socketConnection(token);
      axios
        .get(`http://localhost:3001/followedVacations/user`)
        .then((response) => {
          let vacationsID = response.data;
          dispatch({
            type: ActionType.GetAllFollowedVacation,
            payload: vacationsID,
          });
        });
      axios
        .get(`http://localhost:3001/followedVacations/followersAmount`)
        .then((response) => {
          let followersAmount = response.data;
          dispatch({
            type: ActionType.amountOfFollowers,
            payload: followersAmount,
          });
        });
      setShow(false);
    } catch (error) {
      setValidDetails(true);
      setTimeout(() => {
        setValidDetails(false);
      }, 3000);
      console.log(error);
    }
  };

  function socketConnection(token: string) {
    const socket = io("http://localhost:8000/", {
      query: { token },
    }).connect();

    socket.on("deleteVacation", (vacationIdToRemove) => {
      dispatch({
        type: ActionType.DeleteVacation,
        payload: { vacationID: vacationIdToRemove },
      });
    });

    socket.on("addVacation", (newVacationAdd) => {
      dispatch({
        type: ActionType.AddVacation,
        payload: {
          vacationID: newVacationAdd.id,
          destination: newVacationAdd.destination,
          price: newVacationAdd.price,
          image: newVacationAdd.image,
          dates: newVacationAdd.dates,
          details: newVacationAdd.details,
        },
      });
    });

    socket.on("editVacation", (editedVacation) => {
      dispatch({
        type: ActionType.EditVacation,
        payload: {
          vacationID: editedVacation.id,
          destination: editedVacation.destination,
          price: editedVacation.price,
          image: editedVacation.editImage,
          dates: editedVacation.dates,
          details: editedVacation.details,
        },
      });
    });
  }
  return (
    <div className="Login">
      <Button className="signB" variant="light" onClick={() => setShow(true)}>
        Sign in
      </Button>
      {!isSignedUp && (
        <Modal
          show={show}
          size="sm"
          onHide={() => setShow(false)}
          dialogClassName=""
          aria-labelledby="example-custom-modal-styling-title-sm"
          id="login-modal"
          centered
        >
          <Modal.Header>
            <Modal.Title className="modalx">
              <span id="content1">
                {" "}
                <img
                  alt=""
                  className="site__logo"
                  src="https://img.icons8.com/ios-filled/96/000000/passenger-with-baggage.png"
                />
              </span>
              <span className="sign-in">Sign in</span>
            </Modal.Title>
          </Modal.Header>
          {validDetails && (
            <span id="wrong-info" className="wrong-details">
              <Exclamation className="emoji-wrong" /> Oops, thare is no match.
            </span>
          )}
          <Modal.Body className="modal-body" id="modal-sign-body">
            <div className="form-group">
              <label>Username</label>
              <input
                onChange={onUserNameChanged}
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                required={true}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={onPasswordChanged}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <br></br>
            <button
              onClick={onLoginClicked}
              className="btn btn-primary btn-block"
            >
              Login
            </button>
            <hr></hr>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
