import React from 'react';

import Item from './Item';

const Auction = ({ socket }) => {
  return (
    <div>
      <div className="live">
        <p>Live</p>
      </div>

      <Item socket={socket} />
    </div>
  );
};

export default Auction;
