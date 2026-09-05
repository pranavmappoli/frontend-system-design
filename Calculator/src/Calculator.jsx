import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

/**
 * leeetcodde
 * @param {string} s
 * @return {number}
 */
//     const dfs=(s)=>{
//     const signs=['+','-','*','/']
//     let sign='+'
//     const stack=[]
//     let num=0
//     let indx=0

//     const updateStack=(num,sign)=>{
//         if (sign=='+'){
//             stack.push(num)
//         }
//         else if(sign=='-') {
//             stack.push(-num)
//             }
//         else if(sign=='/') {
//             stack.push(stack.pop()/num)
//             }
//         else if(sign=='*') {
//             stack.push(stack.pop()*num)
//             }

//     }

//     while(indx<s.length){

//         if(s[indx]!==" " && !isNaN(s[indx])) {
//             num=num*10+Number(s[indx])
//             }
//         else if(signs.includes(s[indx])){
//             updateStack(num,sign)
//             sign=s[indx]
//             num=0
//         }
//         else if(s[indx]=='('){
//             const [val,indxGap]=dfs(s.slice(indx+1))
//             num=val
//             indx+=indxGap
//         }
//         else if (s[indx]==')'){
//             updateStack(num,sign)
//             res=stack.reduce((acc,num)=>acc+num,0)
//             return [res,indx+1]
//         }
//         indx+=1

//     }

//     updateStack(num,sign)
//     const result= stack.reduce((acc,num)=>acc+num,0)
//     return [result,indx]
//     }

// var calculate = function(s) {

//     const [res,indx]=dfs(s)
//     return res

// };

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
    const [res] = evaluteExpression(evalStr);
    setInput([res]);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function evaluteExpression(evalStr) {
    let crntNum = "";
    let crntOp = "+";
    const opArry = [];
    let indx = 0;

    function evaluate(crntNum, crntOp) {
      if (crntOp === "+") opArry.push(+crntNum);
      else if (crntOp === "-") opArry.push(-crntNum);
      else if (crntOp === "*") opArry.push(opArry.pop() * crntNum);
      else if (crntOp === "/") opArry.push(opArry.pop() / crntNum);
    }

    while (indx < evalStr.length) {
      if (operators.has(evalStr[indx])) {
        evaluate(crntNum, crntOp);
        crntNum = "";
        crntOp = evalStr[indx];
      } else if (evalStr[indx] === "(") {
        const [val, nextIndx] = evaluteExpression(evalStr.slice(indx + 1));
        evaluate(val, crntOp);
        crntOp = "+";
        indx = indx + nextIndx + 1;
      } else if (evalStr[indx] === ")") {
        evaluate(crntNum, crntOp);
        return [opArry.reduce((total, num) => total + num, 0), indx];
      } else if (!isNaN(evalStr[indx])) {
        crntNum += evalStr[indx];
      }
      indx += 1;
    }
    evaluate(crntNum, crntOp);
    return [opArry.reduce((total, num) => total + num, 0), indx];
  }

  return (
    <div className="flex flex-col items-center max-w-sm gap-4 p-6 shadow-2xl w-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl">
      {/* Display */}
      <div className="w-full p-4 bg-gray-900 shadow-inner rounded-xl">
        <input
          className="w-full font-mono text-3xl text-right text-white placeholder-gray-500 bg-transparent border-none outline-none"
          type="text"
          readOnly
          value={input.join("") || "0"}
          ref={inputRef}
          placeholder="0"
        />
      </div>

      {/* Button Grid */}
      <div className="grid w-full grid-cols-4 gap-3">
        {/* Row 1: Clear, Backspace, Operators */}
        <Button
          className="bg-red-500 hover:bg-red-600"
          colSpan={2}
          onClick={() => setInput([])}
        >
          Clear
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setInput((prev) => [...prev].slice(0, -1))}
        >
          ⌫
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => operatorHandler("/")}
        >
          ÷
        </Button>

        {/* Row 2: 7, 8, 9, × */}
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(7)}
        >
          7
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(8)}
        >
          8
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(9)}
        >
          9
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => operatorHandler("*")}
        >
          ×
        </Button>

        {/* Row 3: 4, 5, 6, - */}
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(4)}
        >
          4
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(5)}
        >
          5
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(6)}
        >
          6
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => operatorHandler("-")}
        >
          −
        </Button>

        {/* Row 4: 1, 2, 3, + */}
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(1)}
        >
          1
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(2)}
        >
          2
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(3)}
        >
          3
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => operatorHandler("+")}
        >
          +
        </Button>

        {/* Row 5: 0, ., = */}
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          colSpan={2}
          onClick={() => numberHandler(0)}
        >
          0
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(".")}
        >
          .
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler("(")}
        >
          (
        </Button>
        <Button
          className="bg-gray-700 hover:bg-gray-600"
          onClick={() => numberHandler(")")}
        >
          )
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => evaluateHanlder()}
        >
          =
        </Button>
      </div>
    </div>
  );
}

export default Calculator;
