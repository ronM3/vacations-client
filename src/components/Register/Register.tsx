import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import "./Register.css";

function Register() {
  const [showRegister, setShowRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [validatUserName, setValidatUserName] = useState(false);
  const [unvalidUserName, setUnvalidUserName] = useState(false);
  const [validatPassword, setValidatPassword] = useState(false);
  const [unvalidPassword, setUnvalidPassword] = useState(false);
  const [validDetails, setValidDetails] = useState(false);

  const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setValidatUserName(true);
    setUnvalidUserName(false);
  };

  const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setValidatPassword(true);
    setUnvalidPassword(false);
  };

  setTimeout(() => {
    setConfirmation(false);
  }, 6500);

  let onSignUpClick = async () => {
    try {
      if (userName === "") {
        setUnvalidUserName(true);
        return false;
      }
      if (password === "" || password.length < 6) {
        setUnvalidPassword(true);
        return false;
      }

      let newUserDetails = { userName, password, firstName, lastName };
      const response = await axios.post(
        "http://localhost:3001/users",
        newUserDetails
      );
      setConfirmation(true);
      setTimeout(() => {
        setShowRegister(false);
      }, 3200);
    } catch (error) {
      setUnvalidUserName(true);
      setValidDetails(true);
      setTimeout(() => {
        setValidDetails(false);
      }, 3000);
      console.log(error);
    }
  };

  function onRegisterClicked() {
    setUnvalidPassword(false);
    setUnvalidUserName(false);
    setShowRegister(true);
    setValidatUserName(false);
    setValidatPassword(false);
    setFirstName("");
    setLastName("");
    setPassword("");
  }

  return (
    <>
      <Button className="Register" variant="light" onClick={onRegisterClicked}>
        Register
      </Button>

      <Modal
        show={showRegister}
        onHide={() => setShowRegister(false)}
        dialogClassName="modal-90w"
        id="register-modal"
      >
        <Modal.Header>
          <Modal.Title className="modal-header">
            <span className="sign-in">
              <img
                alt=""
                className="avatarLogin"
                src="https://i.postimg.cc/vmHGCK0T/avatar.png"
              />
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-register">
          <div className="form-group">
            <label>First name</label>
            <FloatingLabel
              className="floating-label"
              label="First name (optional)"
            >
              <Form.Control
                type="text"
                onChange={onFirstNameChanged}
                className="form-control"
                placeholder="First name"
              />
            </FloatingLabel>
          </div>

          <div className="form-group">
            <label>Last name</label>
            <FloatingLabel
              className="floating-label"
              label="Last name (optional)"
            >
              <input
                type="text"
                onChange={onLastNameChanged}
                className="form-control"
                placeholder="Last name (not optional)"
              />
            </FloatingLabel>
          </div>

          <div className="form-group">
            <label>Username</label> <br></br>
            <FloatingLabel className="floating-label" label="Username">
              <Form.Control
                type="text"
                onChange={onUserNameChanged}
                className="form-control"
                placeholder="Username"
                required
                isValid={validatUserName}
                isInvalid={unvalidUserName}
              />
            </FloatingLabel>
          </div>

          <div className="form-group">
            <label>Password</label>
            <FloatingLabel
              className="floating-label"
              label="Password (Minimum 6 characters)"
            >
              <Form.Control
                type="password"
                onChange={onPasswordChanged}
                className="form-control"
                placeholder="Enter password"
                required
                isValid={validatPassword}
                isInvalid={unvalidPassword}
              />
            </FloatingLabel>
          </div>
          {validDetails && (
            <span id="wrong-info" className="wrong-details">
              <ExclamationTriangle className="emoji-wrongName" /> User name is
              already exist
            </span>
          )}
          <br></br>
          <button
            type="submit"
            onClick={onSignUpClick}
            className="btn btn-primary btn-block"
          >
            Sign Up
          </button>
          {confirmation && (
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          )}

          <p className="forgot-password text-right">
            Already registered <a href="">sign in?</a>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
