"use client";
import useCounter from "../../store"; // TypeScript 스토어 파일 가져오기

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { count, increment, decrement } = useCounter();

  return (
    <div>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
    </div>
  );
};

export default page;
