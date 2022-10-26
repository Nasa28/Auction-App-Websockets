import React, { useState, useEffect } from 'react';

import Item from './Item';

const Auction = ({ socket }) => {
  const [winner, setWinner] = useState('');

  useEffect(() => {
    socket.on('winner', (data) => {
      setWinner(data);
    });
  }, [socket]);
  return (
    <div>
      <div className="live">
        <p>Live</p>

        <p style={{ color: 'green' }}>{winner}</p>
      </div>

      <Item socket={socket} />
    </div>
  );
};

export default Auction;
