import React from 'react';
import Item from './Item';
import Notification from './Notification';
const Auction = ({ socket }) => {
  return (
    <div>
      <div className="nav">
        <div className="live">
          <p>Live</p>
        </div>
      </div>
      <Notification socket={socket} />
      <Item socket={socket} />
    </div>
  );
};

export default Auction;
