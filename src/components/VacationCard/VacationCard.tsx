import axios from "axios";
import {
  Card,
  Row,
  Col,
  Container,
  ToggleButton,
  Badge,
} from "react-bootstrap";
import { BookmarkStar } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../Redux/action-type";
import { AppState, IVacation } from "../../Redux/AppState";
import DeleteVacation from "../DeleteVacation/DeleteVacation";
import EditVacation from "../EditVacation/EditVacation";
import "./vacationCard.css";

export default function VacationCard(props: IVacation) {
  const currentUserState = useSelector(
    (state: AppState) => state.currentUserState
  );
  const dispatch = useDispatch();

  let onFavoriteBClicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    let vacationID = { vacationID: props.id };
    if (!props.isFollowed) {
      axios
        .post("/followedVacations", vacationID)
        .then((response) => {
          dispatch({
            type: ActionType.followVacation,
            payload: { vacationID: props.id, isFollowed: event.target.checked },
          });
        });
    } else {
      axios
        .delete(`/followedVacations/${props.id}`)
        .then((response) => {
          dispatch({
            type: ActionType.UnfollowVacation,
            payload: { vacationID: props.id, isFollowed: event.target.checked },
          });
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Card style={{ width: "18rem" }} className="cardV">
            <Card.Img variant="top" src={props.image} className="imageV" />
            <Card.Body className="vCard-body">
              <Card.Title>{props.destination}</Card.Title>
              <Card.Text className="card-details">{props.details}</Card.Text>
              <hr></hr>
              <Card.Text className="datesV">{props.dates}</Card.Text>
              <Card.Subtitle>
                <span className="priceT">${props.price}</span>
              </Card.Subtitle>
              <Card.Text className="under-price">per person</Card.Text>
              {currentUserState === "admin" && (
                <Card.Subtitle className="card-admin">
                  <DeleteVacation
                    id={props.id}
                    image={props.image}
                    destination={props.destination}
                    dates={props.dates}
                    price={props.price}
                    details={props.details}
                    isFollowed={props.isFollowed}
                    amountOfFollowers={props.amountOfFollowers}
                  />
                  <EditVacation
                    id={props.id}
                    image={props.image}
                    destination={props.destination}
                    dates={props.dates}
                    price={props.price}
                    details={props.details}
                    isFollowed={props.isFollowed}
                    amountOfFollowers={props.amountOfFollowers}
                  />
                </Card.Subtitle>
              )}

              <Card.Subtitle>
                {currentUserState === "customer" && (
                  <ToggleButton
                    className="btn favoriteB"
                    id={props.destination}
                    type="checkbox"
                    checked={props.isFollowed}
                    variant="outline-primary"
                    value="defaultValue"
                    onChange={onFavoriteBClicked}
                  >
                    <BookmarkStar className="follow" />
                  </ToggleButton>
                )}
              </Card.Subtitle>

              <Card.Subtitle>
                {currentUserState !== "admin" && (
                  <button className="followrs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="26"
                      fill="lightblue"
                      className="bi bi-bookmark-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                      />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>
                    {currentUserState !== "" && (
                      <Badge className="badge" pill bg="info">
                        {props.amountOfFollowers}
                      </Badge>
                    )}
                  </button>
                )}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
