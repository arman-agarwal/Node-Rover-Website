"use client";
import Link from "next/link";
import { sendcommand } from "../API/node-rover-methods";
import Chart from "../components/map";
import { useRef, useState } from "react";
import "./page.css";
export default function Home() {
  const [path, setPath] = useState([[5, 5]]);
  const moveIntervalRef = useRef(null);
  let turnIntervalRef = useRef(null);
  let currDirectionRef = useRef([0, 1]);
  let currAngleRef = useRef(90);
  let currPosRef = useRef([5, 5]);
  let maxY = 10;
  let maxX = 10;

  async function stop() {
    clearInterval(moveIntervalRef.current);
    clearInterval(turnIntervalRef.current);
  }

  async function turn(direction) {
    clearInterval(turnIntervalRef.current);
    turnIntervalRef.current = setInterval(async () => {
      currAngleRef.current += direction == "left" ? -20 : 20;
      currDirectionRef.current = [
        Math.cos((currAngleRef.current * Math.PI) / 180),
        Math.sin((currAngleRef.current * Math.PI) / 180),
      ];
      await sendcommand(direction);
    }, 500);
  }

  function handleForward() {
    clearInterval(moveIntervalRef.current);

    moveIntervalRef.current = setInterval(() => {
      let prevPos = path[path.length - 1];
      currPosRef.current = [
        currPosRef.current[0] + currDirectionRef.current[0] * 0.2,
        currPosRef.current[1] + currDirectionRef.current[1] * 0.2,
      ];
      setPath((prevPath) => {
        const newPath = [...prevPath, currPosRef.current];
        return newPath;
      });
    }, 200);
    sendcommand("forward");
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <div className="scale-150">
        <div className="flex flex-row w-40 justify-between">
          <button
            class="driveButton"
            onMouseDown={handleForward}
            onMouseUp={() => {
              stop();
              sendcommand("stop");
            }}
          >
            Move
          </button>
          <button
            class="driveButton"
            onClick={async () => {
              await stop();
              await sendcommand("stop");
            }}
          >
            Stop
          </button>
        </div>
        <div className="flex flex-row w-40 justify-between">
          <button
            class="driveButton"
            onMouseDown={async () => await turn("left")}
            onMouseUp={() => {
              stop();
              sendcommand("stop");
            }}
          >
            Left
          </button>
          <button
            onMouseDown={async () => await turn("right")}
            onMouseUp={() => {
              stop();
              sendcommand("stop");
            }}
            class="driveButton"
          >
            Right
          </button>
        </div>

        <Link href="/grid-mode">Switch to Node Mode</Link>
      </div>
      <Chart pathCoordinates={path.map((e) => [e[1], maxY - 1 - e[0]])}></Chart>
    </main>
  );
}
