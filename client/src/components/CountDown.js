import React, { useEffect, useState } from 'react';

const CountDown = ({ socket }) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    socket.on('counter', (count) => {
      setSeconds(count);
    });
  }, [socket]);
  return (
    <div className="counter">
      <button>{seconds}</button>
    </div>
  );
};
export default CountDown;
