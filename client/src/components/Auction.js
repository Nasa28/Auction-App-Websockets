import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="nav">
        <div className="live">
          <p>Live</p>
        </div>

        <div>
          <Link to="/items/add" className="links">
            Add Item
          </Link>
        </div>
      </div>
      <p style={{ color: 'green' }}>{winner}</p>
      <Item socket={socket} />
    </div>
  );
};

export default Auction;
