import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0);
  };

  return (
    <div
      data-cy="counter"
      className="h-screen w-full bg-gray-300 text-gray-700 flex flex-col justify-center items-center text-6xl"
    >
      <div className="text-9xl font-bold mb-8" data-cy="count-value">
        {count}
      </div>
      <div className="flex gap-4">
        <button
          data-cy="decrement-button"
          onClick={decrement}
          className="bg-red-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <button
          data-cy="increment-button"
          onClick={increment}
          className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
