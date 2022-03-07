import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { ActionType } from "../../Redux/action-type";
import { IVacation } from "../../Redux/AppState";
import VacationCard from "../VacationCard/VacationCard";
import "./DeleteVacation.css";

export default function DeleteVacation(props: IVacation) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  function onDeleteClicked() {
    axios
      .delete(`/vacations/${props.id}`)
      .then((response) => {
        dispatch({
          type: ActionType.DeleteVacation,
          payload: { vacationID: props.id },
        });
      });
    setShow(false);
  }

  return (
    <div className="DeleteVacation">
      <>
        <Button
          variant="outline-danger"
          className="deleteB"
          onClick={handleShow}
        >
          <Trash className="delete-trash" />
        </Button>

        <Modal
          id="modalShow"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Body id="modal-bodyS" className="modal-body">
            Are you sure you want to delete this vacation?
            <p className="modal-v">
              <VacationCard
                id={props.id}
                image={props.image}
                destination={props.destination}
                dates={props.dates}
                price={props.price}
                details={props.details}
                isFollowed={props.isFollowed}
                amountOfFollowers={props.amountOfFollowers}
              />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className="modal-deleteB" onClick={onDeleteClicked}>
              Delete
            </Button>
            <Button
              className="closeModalB"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
