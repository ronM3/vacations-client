import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./CountDown.css";

function CountDown() {
  let d;
  let h;
  let m;
  let s;

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const difference = +new Date(`03/07/${year}`) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      d = Math.floor(difference / (1000 * 60 * 60 * 24));
      h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      m = Math.floor((difference / 1000 / 60) % 60);
      s = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="countDown">
      <Container>
        <Row>
          <h2 className="flash-heading">Flash Deal</h2>
          <p className="time-content">
            <span className="box">{d}d</span>
            <span className="box">{h}h</span>
            <span className="box">{m}m</span>
            <span className="box">{s}s</span>
          </p>
        </Row>
      </Container>
      {/* {timerComponents.length ? timerComponents : <span>Time's up!</span>} */}
    </div>
  );
}

export default CountDown;
