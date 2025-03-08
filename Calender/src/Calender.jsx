import React, { useState } from "react";

const months = [
  "January",
  "February",
  "march",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Calender() {
  const currentDate = new Date();
  const startYear = 2000;
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const numOfDays = new Date(year, month + 1, 0).getDate();
  const startDate = new Date(year, month, 1).getDay();

  function isToday(date) {
    return (
      currentDate.getMonth() === month &&
      currentDate.getFullYear() === year &&
      currentDate.getDate() === date
    );
  }
  return (
    <div className="flex flex-col gap-2 min-w-[400px] bg-white p-4">
      <div className="flex justify-between">
        <select
          value={month}
          name="months"
          id="month"
          onChange={(e) => setMonth(Number(e.target.value))}
          className="p-2 border border-1"
        >
          {months.map((month, indx) => (
            <option key={month} value={indx}>
              {month}
            </option>
          ))}
        </select>
        <div className="p-2 bg-green-300">{months[month] + " " + year}</div>
        <select
          value={year}
          name="years"
          id="year"
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2 border border-1"
        >
          {Array(50)
            .fill(0)
            .map((_, index) => (
              <option key={startYear + index} value={startYear + index}>
                {startYear + index}
              </option>
            ))}
        </select>
      </div>
      <ul className="grid grid-cols-7 gap-2 p-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}

        {Array(startDate)
          .fill(0)
          .map((_, indx) => (
            <li key={indx + 10000} className="w-4 h-4 p-2 list"></li>
          ))}
        {Array(numOfDays)
          .fill(0)
          .map((_, indx) => (
            <li
              key={indx}
              className={`p-4 font-bold text-center border border-black border-1 ${
                isToday(indx + 1) ? "bg-green-500" : ""
              }`}
            >
              {indx + 1}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Calender;
