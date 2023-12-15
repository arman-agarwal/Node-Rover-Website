"use client";
import "./page.css";
import { sendcommand } from "../API/node-rover-methods";
import { useState } from "react";
import Link from "next/link";
import Chart from "../components/map";
export default function Home() {
  const [path, setPath] = useState([
    [0, 0],
    [0, 1],
  ]);
  let maxX = 10;
  let maxY = 10;
  let coordinates = [];
  for (let i = maxX - 1; i >= 0; i--) {
    let row = [];
    for (let j = 0; j < maxY; j++) {
      row.push([i, j]);
    }
    coordinates.push(row);
  }

  function clearPath() {
    setPath([]);
  }

  function handleSubmit() {
    console.log("here");
    console.log(path);
    let gridData = "";
    path.forEach((node) => {
      gridData += `${node[0]},${node[1]};`;
    });
    gridData = gridData.substring(0, gridData.length - 1);
    console.log(gridData);
    if (path.length > 0) {
      sendcommand("select_grid", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "gridData=" + gridData,
      });
    }
    clearPath();
  }
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row justify-between m-10">
        <div>
          {coordinates.map((row, i) => (
            <div key={i} className="flex flex-row">
              {row.map((coordinate, i) => (
                <button key={i} onClick={() => setPath([...path, coordinate])}>
                  {CoordinateCell(coordinate[0], coordinate[1])}
                </button>
              ))}
            </div>
          ))}
          <div className="flex flex-row posList">
            <span>Current Path :</span>
            {path.length == 0
              ? "None Selected"
              : path.map((node, i) => {
                  return <div key={i}>{` (${node[0]},${node[1]}),`}</div>;
                })}
          </div>
          <div className="flex flex-col h-20 justify-between">
            <button className="gridButton" onClick={clearPath}>
              Clear Path
            </button>
            <button className="gridButton" onClick={handleSubmit}>
              submit
            </button>
            <Link className="gridButton" href="/drive-mode">
              .Switch to Drive Mode
            </Link>
          </div>
        </div>
        <div>
          <Chart
            pathCoordinates={
              path.length == 0
                ? [[0, maxY - 1 - 0]]
                : path.map((e) => [e[1], maxY - 1 - e[0]])
            }
          />
        </div>
      </div>
    </main>
  );
}

function CoordinateCell(x, y) {
  return (
    <div className="border-2 border-solid border-black w-10 h-10">
      {x + "," + y}
    </div>
  );
}
