import { useDispatch, useSelector } from "react-redux";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsContainer.css";
import { Key, useEffect } from "react";
import axios from "axios";
import { ActionType } from "../../Redux/action-type";
import { AppState, IVacation } from "../../Redux/AppState";
import VacationCarusel from "../VacationCarusel/VacationCarusel";

export default function VacationsContainer() {
  let vacationsArrayState = useSelector((state: AppState) => {
    return state.vacations;
  });

  let userIsLoggedIn = useSelector((state: AppState) => state.userIsLoggedIn);

  const dispatch = useDispatch();

  const getAllVacation = () => {
    axios.get("http://localhost:3001/vacations").then((response) => {
      let vacationsData:IVacation [] = response.data;
      dispatch({
        type: ActionType.GetAllVacations,
        payload: vacationsData,
      });
      dispatch({
        type: ActionType.GetAllFollowedVacation,
        payload: vacationsData,
      });
    });
  };
  useEffect(() => getAllVacation(), []);

  const getFollowedVacation = () => {
    if (userIsLoggedIn) {
      axios
        .get(`http://localhost:3001/followedVacations/user`)
        .then((response) => {
          let vacationsID = response.data;
          dispatch({
            type: ActionType.GetAllFollowedVacation,
            payload: vacationsID,
          });
        });
    }
  };
  useEffect(() => getFollowedVacation(), []);

  return (
    <div>
      <VacationCarusel />
      <div id="V" className="grid">
        {vacationsArrayState.map(
          (vacation: IVacation, index: Key | null | undefined) => (
            <VacationCard
              key={index}
              id={vacation.id}
              image={vacation.image}
              destination={vacation.destination}
              details={vacation.details}
              dates={vacation.dates}
              price={vacation.price}
              isFollowed={vacation.isFollowed}
              amountOfFollowers={vacation.amountOfFollowers}
            />
          )
        )}
      </div>
    </div>
  );
}
