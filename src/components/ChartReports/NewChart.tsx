import { Chart } from "chart.js";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function ChartReported() {
let [Show, setShow] = useState(false);
let dates = [];
let confirmedCases = [];
let confirmedRecovered = [];
let confirmedDeaths = [];

function addArrayFunc(date, confirmed, recovered, deaths) {
  dates.push(date);
  confirmedCases.push(confirmed);
  confirmedRecovered.push(recovered);
  confirmedDeaths.push(deaths);
}

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then(cases => {
    cases["Australia"].forEach(({
        date,
        confirmed,
        recovered,
        deaths
      }) =>
      addArrayFunc(date, confirmed, recovered, deaths)
    )
   let ctx =  (document.getElementById('myChart') as HTMLCanvasElement)
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
            label: 'Confirmed',
            borderColor: 'pink',
            backgroundColor: 'pink',
            fill: 'false',
            data: confirmedCases
          },
          {
            label: 'Recovered',
            borderColor: 'blue',
            backgroundColor: 'blue',
            fill: 'false',
            data: confirmedRecovered
          },
          {
            label: 'Deaths',
            borderColor: 'green',
            backgroundColor: 'green',
            fill: 'false',
            data: confirmedDeaths
          }
        ]
      },
    //   options: {
    //     responsive: true,
    //     title: {
    //       display: true,
    //       text: 'Covid-19 Cases in Australia'
    //     },
    //   }
    });
  });

  return (
    <canvas id="myChart" height="90"></canvas>
  )
}