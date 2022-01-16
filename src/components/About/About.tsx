import "./About.css";
import me from "./Me1.jpg";
import laptop from "./coding-man.jpg";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function About() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossOrigin="anonymous"
      />
      <div className="about">
        <Image src={laptop} fluid />
        <Container>
          <div className="typing-demo">About Me</div>
          <Row>
            <Col>
              <div className="about-left">
                <div className="about-left-content">
                  <div>
                    <div className="shadow">
                      <div className="about-img">
                        <img className="aboutme" src={me} alt="about image" />
                      </div>
                    </div>

                    <h2>Ron Motola</h2>
                    <h3>Web developer</h3>
                  </div>

                  <ul className="icons">
                    <li>
                      <i>
                        <a
                          className="fab fa-facebook-f"
                          href="https://www.facebook.com/ron.motola.1"
                        />
                      </i>
                    </li>
                    <li>
                      <i className="fab fa-linkedin"></i>
                    </li>
                    <li>
                      <i>
                        <a
                          className="fab fa-instagram"
                          href="https://www.instagram.com/ron_moto/"
                        />
                      </i>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col>
              {" "}
              <div className="about-right">
                <h2>About this project</h2>
                <div className="about-para">
                  <p>
                    Vacations Tagging System, you can watch all the vacations as
                    a guest but if you want to track, follow and see how many
                    followers the vacations have you will need to sign up to the
                    site. Once you logged in you will have the options to follow
                    vacation or watch how many followers each one have, also
                    every vacation can change in real time when admin make any
                    change.
                  </p>
                  <p className="small-p">
                    Admin have the options to view statistic reports using chart.js  to delete, edit, and add new
                    vacations that will change real time using socket.io
                  </p>
                  <Row className="technogl">
                    <Col>
                      <p className="techs">
                        <span>Client side:</span>

                        <ul>
                          <li> HTML, CSS, Bootstrap</li>
                          <li>REACT-TypeScript, Redux</li>
                        </ul>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Server side - NodeJS:
                        <ul>
                          <li>Using express</li>
                          <li>Restfull App</li>
                          <li>Socket io</li>
                        </ul>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Database:
                        <ul>
                          <li>MySql</li>
                        </ul>
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className=""></div>
      </div>
    </>
  );
}
