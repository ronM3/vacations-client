import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { ActionType } from "../Redux/action-type";


export default function ConnectSocket(token: string) {

    const dispatch = useDispatch();

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
