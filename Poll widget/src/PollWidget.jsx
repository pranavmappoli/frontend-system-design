import React, { createContext, useContext } from "react";

const PollContext = createContext();
function PollWidget({ children, totalVotes = 0, onChange }) {
  return (
    <PollContext.Provider value={{ totalVotes, onChange }}>
      <div className="w-[400px] bg-green-300 p-4 rounded-lg">
        <fieldset>
          <legend className="text-3xl font-bold text-center text-white">
            Poll widget
          </legend>
          <ul className="flex flex-col gap-4">{children}</ul>
        </fieldset>
      </div>
    </PollContext.Provider>
  );
}

function Item({ children, id, votes }) {
  const { totalVotes, onChange } = useContext(PollContext);
  const percentage = (votes / totalVotes) * 100;
  return (
    <li>
      <div className="flex items-center gap-1 p-1">
        <input
          type="radio"
          id={id}
          name="rating"
          onChange={() => onChange(id)}
        />
        <label htmlFor={id}>{children}</label>
      </div>
      <ProgressBar percentage={percentage} />
    </li>
  );
}

function ProgressBar({ percentage = 0 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="relative w-full h-2 bg-blue-50">
        <div
          style={{ width: `${percentage}%` }}
          className="absolute left-0 h-2 bg-green-700 "
        ></div>
      </div>
      <span>{percentage.toFixed(2)}</span>
    </div>
  );
}

PollWidget.Item = Item;
export default PollWidget;
