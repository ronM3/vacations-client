import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import "./ChartReports.css";
import "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";
import { AppState } from "../../Redux/AppState";

export default function ChartReports() {
  let [Show, setShow] = useState(false);
  let chartDataArray = useSelector((state: AppState) => {
    return state.chartData;
  });
  const [chartData, setCartData] = useState([{}]);
  let followersPerVacation = [];

  try {
    axios.get("http://localhost:3001/followedVacations").then((response) => {
      followersPerVacation = response.data;

      for (let destination of followersPerVacation) {
        chartDataArray.labels.push(destination.destination);
        chartDataArray.datasets[0].data.push(destination.followersAmount);
      }
    });
  } catch (error) {
    alert("Failed fecthing the data");
  }
  chartDataArray = {
    labels: ([] = []),
    type: "bar",
    datasets: [
      {
        label: "Number of followers",
        data: ([] = []),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="ChartReports">
      <Button
        className="ChartReportsB"
        variant="outline-secondary"
        onClick={() => setShow(true)}
      >
        Reports
      </Button>

      <Modal
        show={Show}
        size="lg"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        backdrop="static"
        keyboard={false}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Statistic reports for followers
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <Bar
            id="myChart"
            redraw={true}
            data={chartDataArray}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },

              plugins: {
                title: {
                  display: true,
                  text: "Vacations",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
          <Button variant="warning">Get latest upadated data</Button>{" "}
        </Modal.Body>
      </Modal>
    </div>
  );
}
