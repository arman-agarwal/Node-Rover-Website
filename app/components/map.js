"use client";
import React, { useRef } from "react";
import "./map.css";
import { useState, useEffect } from "react";
function Chart({ pathCoordinates }) {
  const gridSize = 100;
  const pathData = pathCoordinates
    .map(([x, y]) => `${x * gridSize},${y * gridSize}`)
    .join(" ");

  const [lastX, lastY] =
    pathCoordinates.length > 0
      ? pathCoordinates[pathCoordinates.length - 1]
      : [0, 9];
  return (
    <div
      className="box"
      style={{
        width: gridSize * 10,
        height: gridSize * 10,
      }}
    >
      <svg width={gridSize * 20} height={gridSize * 20}>
        <path d={`M ${pathData}`} fill="none" stroke="black" strokeWidth="3" />
        <image
          x={lastX * gridSize - 10}
          y={lastY * gridSize - 10}
          width="40"
          height="40"
          href="SimpleCar.svg"
        />
      </svg>
    </div>
  );
}

export default Chart;
