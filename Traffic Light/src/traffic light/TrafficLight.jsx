import React, { useEffect, useRef, useState } from "react";

function TrafficLight() {
  const [currentColor, setCurrentColor] = useState("red");
  const timerRef = useRef();
  const trafficConfig = {
    green: {
      duration: 2000,
      color: "bg-green-500",
      next: "yellow",
    },
    yellow: {
      duration: 1000,
      color: "bg-yellow-500",
      next: "red",
    },
    red: {
      duration: 4000,
      color: "bg-red-500",
      next: "green",
    },
  };
  useEffect(() => {
    const { duration, next } = trafficConfig[currentColor];

    timerRef.current = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [currentColor]);

  console.log(currentColor);

  return (
    <div className="flex flex-col gap-4 p-8 bg-black rounded-3xl">
      <div
        className={`w-32 h-32  rounded-full ${
          currentColor === "green"
            ? trafficConfig[currentColor].color
            : "bg-gray-500"
        }`}
      ></div>
      <div
        className={`w-32 h-32  rounded-full ${
          currentColor === "yellow"
            ? trafficConfig[currentColor].color
            : "bg-gray-500"
        }`}
      ></div>
      <div
        className={`w-32 h-32  rounded-full ${
          currentColor === "red"
            ? trafficConfig[currentColor].color
            : "bg-gray-500"
        }`}
      ></div>
    </div>
  );
}

export default TrafficLight;
