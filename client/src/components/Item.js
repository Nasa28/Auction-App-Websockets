import React, { useEffect, useState } from 'react';
import BidItem from './BidItem';
import CountDown from './CountDown';
const Item = ({ socket }) => {
  const [items, setItems] = useState([]);
  const [buttonprice, setButtonprice] = useState(undefined);

  useEffect(() => {
    socket.on('all-items', (data) => {
      setItems(data);
    });
  }, [socket]);
  return (
    <div className="div">
      <div className="bidding-buttons">
        <div>
          <button onClick={() => setButtonprice(14)}>+14€</button>
        </div>
        <div>
          <button onClick={() => setButtonprice(16)}>+16€</button>
        </div>
        <div>
          <button onClick={() => setButtonprice('Autre')}>Autre</button>
        </div>
      </div>
      <div className="item-box">
        {items.length === 0 ? (
          <div>
            <p style={{ color: 'blue' }}>Wait for auction to start</p>
          </div>
        ) : (
          items.map((product) => (
            <div key={product.id}>
              <div>
                <div className="item-detail">
                  <div>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                  </div>
                  <div>
                    <button>{product.current_price}€</button>
                  </div>
                </div>
              </div>

              <CountDown socket={socket} />
              <BidItem
                id={product.id}
                current_price={product.current_price}
                name={product.name}
                socket={socket}
                buttonprice={buttonprice}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Item;
