import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { ActionType } from "../../Redux/action-type";
import { IVacation } from "../../Redux/AppState";

import "./EditVacation.css";

export default function EditVacation(props: IVacation) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [destination, setDestination] = useState(props.destination);
  const [price, setPrice] = useState(props.price);
  const [dates, setDates] = useState(props.dates);
  const [details, seDetails] = useState(props.details);
  const [image, setImage] = useState(props.image);

  const [editImage, setEditImage] = useState("");
  let [file, setFile] = useState();
  let [fileName, setFileName] = useState("");

  let saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setEditImage(`http://localhost:3001/${e.target.files[0].name}`);
  };

  const uploadFile = async () => {
    const myFormData = new FormData();
    myFormData.append("file", file);
    myFormData.append("fileName", fileName);
    setEditImage(`http://127.0.0.1:3001/${fileName}`);
    try {
      const response = await axios.post(
        "http://localhost:3001/files/upload",
        myFormData
      );
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();

  const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };
  const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.valueAsNumber);
  };
  const onDatesChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDates(event.target.value);
  };
  const onDetailsChanged = (event: ChangeEvent<HTMLInputElement>) => {
    seDetails(event.target.value);
  };

  async function onConfirmClicked() {
    let newEditedVacation = {};
    if (editImage !== "") {
      newEditedVacation = {
        image: editImage,
        destination: destination,
        details: details,
        dates: dates,
        price: price,
        id: props.id,
      };
    } else {
      newEditedVacation = {
        image: image,
        destination: destination,
        details: details,
        dates: dates,
        price: price,
        id: props.id,
      };
    }

    axios
      .put("http://localhost:3001/vacations", newEditedVacation)
      .then((response) => {
        dispatch({
          type: ActionType.EditVacation,
          payload: {
            vacationID: props.id,
            destination,
            price,
            dates,
            editImage: image,
            details,
          },
        });
        setShow(false);
      })
      .catch((error: any) => alert(`${error.response.data.error}`));
  }

  return (
    <div className="editVacation">
      <>
        <Button
          className="editB"
          variant="outline-success"
          onClick={() => setShow(true)}
        >
          <Pen className="editB-pen" />
        </Button>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          backdrop="static"
          keyboard={false}
          id="delte-modal"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title
              className="modal-header"
              id="example-custom-modal-styling-title"
            >
              Edit Vacation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <h5 className="modal-note">
              Note: you have to click on the button "Upload image" in order to
              save the image on the server.
            </h5>
            <div className="form-group">
              <label></label>
              <input
                type="text"
                defaultValue={destination}
                onChange={onDestinationChanged}
                className="form-control"
                placeholder="Destination"
              />
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="number"
                defaultValue={price}
                onChange={onPriceChanged}
                className="form-control"
                placeholder="Price"
              />
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="text"
                defaultValue={dates}
                onChange={onDatesChanged}
                className="form-control"
                placeholder="Dates - dd / mm / yyyy "
              />
            </div>
            <div className="form-group">
              <label></label>
              <input
                type="text"
                defaultValue={image}
                className="form-control"
                placeholder="Image URL"
              />
            </div>
            <div>
              <label></label>
              <input
                type="file"
                id="fileupload"
                onChange={saveFile}
                className="form-control"
              />
            </div>
            <div>
              <button
                type="submit"
                id="uploadB"
                className="form-control"
                onClick={uploadFile}
              >
                Upload image
              </button>
            </div>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                className="addVacation-details"
                as="textarea"
                defaultValue={details}
                onChange={onDetailsChanged}
                placeholder="Enter vacation details...."
                rows={3}
              />
            </Form.Group>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={onConfirmClicked}
            >
              Confirm
            </button>
            <Button
              className="closeModalB"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
