// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const Main = () => {
    const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const isOperator = (char) => {
    return ['+', '-', '*', '/'].includes(char);
  };

  const clearCalculator = () => {
    setDisplay('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleNumber = (num) => {
    if (evaluated) {
      setDisplay(num);
      setFormula(num);
      setEvaluated(false);
    } else {
      if (display === '0') {
        setDisplay(num);
        setFormula(num);
      } else {
        setDisplay(display + num);
        setFormula(formula + num);
      }
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay('0.');
      setFormula('0.');
      setEvaluated(false);
      return;
    }

    const lastNumber = display.split(/[-+*/]/).pop();
    if (!lastNumber.includes('.')) {
      setDisplay(display + '.');
      setFormula(formula + '.');
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(display + operator);
      setDisplay(operator);
      setEvaluated(false);
    } else {
      if (operator === '-' && (formula === '' || isOperator(formula.slice(-1)))) {
        setFormula(formula + operator);
        setDisplay(operator);
      } else if (isOperator(formula.slice(-1))) {
        if (isOperator(formula.slice(-2, -1))) {
          setFormula(formula.slice(0, -2) + operator);
        } else {
          setFormula(formula.slice(0, -1) + operator);
        }
        setDisplay(operator);
      } else {
        setFormula(formula + operator);
        setDisplay(operator);
      }
    }
  };

  const calculate = () => {
    if (formula) {
      let result;
      try {
        let expression = formula;
        if (isOperator(expression.slice(-1))) {
          expression = expression.slice(0, -1);
        }
        result = Number(eval(expression).toFixed(4));
      } catch (e) {
        console.log(e)
        result = 'Error';
      }
      setDisplay(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
      <div className="w-80 bg-gray-800 p-4 rounded-lg shadow-xl">
        <div className="mb-4">
          <div className="h-16 bg-gray-700 rounded p-2 text-right">
            <div className="text-gray-400 text-sm h-6 overflow-hidden">
              {formula || '0'}
            </div>
            <div id="display" className="text-white text-2xl font-bold overflow-hidden">
              {display}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <button 
            id="clear" 
            onClick={clearCalculator}
            className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded"
          >
            AC
          </button>
          <button 
            id="divide" 
            onClick={() => handleOperator('/')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded"
          >
            /
          </button>
          <button 
            id="multiply" 
            onClick={() => handleOperator('*')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded"
          >
            *
          </button>
          
          <button 
            id="seven" 
            onClick={() => handleNumber('7')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            7
          </button>
          <button 
            id="eight" 
            onClick={() => handleNumber('8')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            8
          </button>
          <button 
            id="nine" 
            onClick={() => handleNumber('9')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            9
          </button>
          <button 
            id="subtract" 
            onClick={() => handleOperator('-')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded"
          >
            -
          </button>
          
          <button 
            id="four" 
            onClick={() => handleNumber('4')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            4
          </button>
          <button 
            id="five" 
            onClick={() => handleNumber('5')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            5
          </button>
          <button 
            id="six" 
            onClick={() => handleNumber('6')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            6
          </button>
          <button 
            id="add" 
            onClick={() => handleOperator('+')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded"
          >
            +
          </button>
          
          <button 
            id="one" 
            onClick={() => handleNumber('1')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            1
          </button>
          <button 
            id="two" 
            onClick={() => handleNumber('2')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            2
          </button>
          <button 
            id="three" 
            onClick={() => handleNumber('3')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            3
          </button>
          <button 
            id="equals" 
            onClick={calculate}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded row-span-2"
          >
            =
          </button>
          
          <button 
            id="zero" 
            onClick={() => handleNumber('0')}
            className="col-span-2 bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            0
          </button>
          <button 
            id="decimal" 
            onClick={handleDecimal}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded"
          >
            .
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
