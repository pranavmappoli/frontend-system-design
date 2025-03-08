import React, { useEffect, useRef, useState } from "react";

function Calculator() {
  const operators = new Set(["*", "+", "-", "/"]);
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const numberHandler = (num) => {
    setInput((prev) => [...prev, num]);
  };

  const operatorHandler = (operator) => {
    const tempInput = [...input];
    if (operators.has(tempInput.at(-1))) {
      tempInput.pop();
    }
    tempInput.push(operator);
    setInput(tempInput);
  };
  const evaluateHanlder = () => {
    const evalStr = input.join("");
    const res = evaluteExpression(evalStr);
    setInput([res]);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function evaluteExpression() {
    let crntNum = "";
    let crntOp = "+";
    const opArry = [];
    let indx = 0;

    const operEval = (operator, num) => {
      if (operator === "+") {
        opArry.push(+num);
      } else if (operator === "-") {
        opArry.push(-num);
      } else if (operator === "/") {
        const frst = opArry.pop();
        opArry.push(frst / num);
      } else if (operator === "*") {
        const frst = opArry.pop();
        opArry.push(frst * num);
      }
    };

    while (indx < input.length) {
      if (operators.has(input[indx])) {
        operEval(crntOp, crntNum);
        crntNum = "";
        crntOp = input[indx];
      } else if (!isNaN(input[indx])) {
        crntNum += input[indx];
      }
      console.log(crntNum, crntOp);
      indx += 1;
    }
    operEval(crntOp, crntNum);
    console.log(opArry);
    return opArry.reduce((crnt, num) => crnt + num, 0);
  }

  return (
    <div className="flex flex-col items-center w-96 bg-green-200 h-[400px] gap-6 px-2">
      <input
        className="inline-block w-full p-2 m-2 bg-green-100 rounded-sm focus:outline-1 outline-green-300"
        type="text"
        readOnly
        value={input.join("")}
        ref={inputRef}
      />
      <div className="flex w-full h-full gap-4 p-4">
        <ul className="grid w-full grid-cols-3 gap-1 bg-green-400 place-items-center">
          {Array(9)
            .fill(0)
            .map((_, indx) => (
              <li>
                <button
                  className="px-4 py-2 bg-green-300 rounded-md"
                  onClick={() => numberHandler(indx + 1)}
                >
                  {indx + 1}
                </button>
              </li>
            ))}
          <button
            className="px-4 py-2 bg-green-300"
            onClick={() => setInput((prev) => [...prev].slice(0, -1))}
          >
            back
          </button>
          <button
            className="px-4 py-2 bg-green-300 "
            onClick={() => numberHandler(0)}
          >
            0
          </button>
        </ul>
        <div className="flex flex-col justify-between h-full gap-1">
          <button
            className="col-start-2 px-4 py-2 bg-green-300"
            onClick={() => operatorHandler("+")}
          >
            +
          </button>
          <button
            className="col-start-2 px-4 py-2 bg-green-300"
            onClick={() => operatorHandler("-")}
          >
            -
          </button>
          <button
            className="col-start-2 px-4 py-2 bg-green-300"
            onClick={() => operatorHandler("*")}
          >
            *
          </button>
          <button
            className="col-start-2 px-4 py-2 bg-green-300"
            onClick={() => operatorHandler("/")}
          >
            /
          </button>
          <button
            className="col-start-2 px-4 py-2 bg-green-300"
            onClick={() => evaluateHanlder()}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
