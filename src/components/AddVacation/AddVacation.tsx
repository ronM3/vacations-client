import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Exclamation, ExclamationTriangle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { ActionType } from "../../Redux/action-type";
import "./AddVacation.css";
import cogoToast from "cogo-toast";

function AddVacation() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validDetails, setValidDetails] = useState(false);
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [dates, setDates] = useState("");
  const [details, seDetails] = useState("");

  const [validInfo, setValidInfo] = useState(false);

  let [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  let [file, setFile] = useState();
  let [fileName, setFileName] = useState("");

  let saveFile = (e) => {
    setImage("");
    setFileName("");
    setFile(e.target.files[0]);
    if (file != null) {
      setFileName(e.target.files[0].name);
    }
    if (fileName != null) {
      setImage(`http://127.0.0.1:3001/${e.target.files[0].name}`);
    }
  };
  function onCancellClicked() {
    setShow(false);
  }

  async function privew() {
    setPreview(image);
  }
  async function confirmVacation() {
    let newAddedVacation = {
      image: image,
      destination: destination,
      details: details,
      dates: dates,
      price: price,
    };
    if (
      image === "" ||
      destination === "" ||
      details === "" ||
      dates === "" ||
      price === ""
    ) {
      setValidDetails(true);
      setTimeout(() => {
        setValidDetails(false);
      }, 3000);
      return false;
    } else if (newAddedVacation == null) {
      setValidDetails(true);
    }
    const myFormData = new FormData();
    myFormData.append("file", file);
    myFormData.append("fileName", fileName);
    const imageResponse = await axios.post(
      "http://localhost:3001/files/upload",
      myFormData
    );
    axios
      .post("http://localhost:3001/vacations", newAddedVacation)
      .then((response) => {
        dispatch({
          type: ActionType.AddVacation,
          payload: {
            vacationID: response.data,
            image: imageResponse.data.toString(),
            destination,
            details,
            dates,
            price,
          },
        });
        cogoToast.success("Success!");
        setShow(false);

        setDestination("");
        setPrice("");
        setDates("");
        setImage("");
        seDetails("");
        setPreview("");
      })
      .catch((error: any) => {
        setValidInfo(true);
        setTimeout(() => {
          setValidInfo(false);
        }, 3000);
      });
  }

  const onDestinationChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
    console.log(price);
  };

  const onDatesChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDates(event.target.value);
  };
  const onDetailsChanged = (event: ChangeEvent<HTMLInputElement>) => {
    seDetails(event.target.value);
  };

  return (
    <div className="AddVacation">
      <>
        <Button
          className="AddVacationB"
          variant="outline-secondary"
          onClick={() => setShow(true)}
        >
          Add Vacation
        </Button>

        <Modal
          show={show}
          id="addVacation"
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          backdrop="static"
          keyboard={false}
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title
              className="add_V_header"
              id="example-custom-modal-styling-title"
            >
              Add New Vacation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {validDetails && (
              <span id="wrong-info" className="wrong-details">
                <Exclamation className="emoji-wrong" /> Must field all the
                details
              </span>
            )}
            <div className="form-group">
              <label></label>
              <input
                type="text"
                onChange={onDestinationChanged}
                className="form-control"
                placeholder="Destination"
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
              <button className="form-control" onClick={privew}>
                Preview
              </button>
              <img className="previewImg" src={preview}></img>
            </div>

            <div className="form-group">
              <input
                type="text"
                onChange={onPriceChanged}
                className="form-control"
                placeholder="Price"
              />
            </div>

            <div className="form-group">
              <label></label>
              <input
                type="text"
                onChange={onDatesChanged}
                className="form-control"
                placeholder="Dates - dd / mm / yyyy "
              />
            </div>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label></Form.Label>
              <Form.Control
                className="addVacation-details"
                as="textarea"
                onChange={onDetailsChanged}
                placeholder="Enter vacation details...."
                rows={3}
              />
            </Form.Group>

            {validInfo && (
              <span id="wrong-info" className="wrong-details">
                <ExclamationTriangle className="emoji-wrongName" /> General
                Error, pleas contact admin.
              </span>
            )}
            <br></br>
            <button
              type="submit"
              onClick={confirmVacation}
              className="btn btn-primary btn-block"
            >
              Confirm
            </button>
            <Button
              className="closeModalB"
              variant="secondary"
              onClick={onCancellClicked}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default AddVacation;
