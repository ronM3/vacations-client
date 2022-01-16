import "./App.css";
import Header from "./components/Header/Header";
import WebInfo from "./components/WebInfo/WebInfo";
import VacationsContainer from "./components/VacationsContainer/VacationsContainer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionType } from "./Redux/action-type";
import ConnectSocket from "./Models/ConnectSocket";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import About from "./components/About/About";

export default function App() {
  const dispatch = useDispatch();

  let token = sessionStorage.getItem("token");
  let userName = sessionStorage.getItem("userName");
  let userType = sessionStorage.getItem("userType");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + `${token}`;

    dispatch({
      type: ActionType.InitUserData,
      payload: { token, userName, userType },
    });
    ConnectSocket(token);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/about" component={About} exact />
          <Route path="/home" component={VacationsContainer} exact />
          <Redirect from="" to="/home" exact />
          <Redirect from="/" to="/home" exact />
        </Switch>
        <hr></hr>
        <WebInfo />
      </BrowserRouter>
    </div>
  );
}
 