import { Carousel } from "react-bootstrap";
import "./VacationCarusel.css";

export default function VacationCarusel() {
  return (
    <div className="VacationCarusel">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.roadaffair.com/wp-content/uploads/2021/03/beach-skyline-tel-aviv-israel-shutterstock_235079188.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="first-slide">The perfect vacation</h1>
            <p className="slide-dest">Tel Aviv, Israel</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.wallpapersafari.com/72/37/rsh1Io.jpeg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h1 className="first-slide">Perfect getaway beach</h1>
            <p className="slide-dest" id="thiland-dest">
              Phuket, Thailand
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.provocolate.com/wp-content/uploads/2019/12/mykonos-town.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <div className="text-box">
              <h1 className="first-slide">Parties and Luxury</h1>
              <p className="slide-dest">Mykonos, greece</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h1 className="second-heading"> Our destinations around the world</h1>
    </div>
  );
}