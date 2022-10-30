import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BidItem = ({ socket, id, current_price, buttonprice, name }) => {
  const [amount, setAmount] = useState(current_price);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [inputD, setInputD] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > Number(current_price)) {
      socket.emit('bidItem', {
        amount,
        name,
        current_price,
        id,
        last_bidder: localStorage.getItem('userName'),
      });
      navigate('/auction');
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (buttonprice === 'Autre') {
      setInputD(!inputD);
    }
    if (buttonprice !== undefined && buttonprice !== 'Autre') {
      setAmount(Number(buttonprice) + Number(current_price));
    }
  }, [buttonprice]);

  return (
    <div>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: 'red' }}>
              The bidding amount must be greater than {current_price}
            </p>
          )}
          {!inputD ? (
            <>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button className="bidItem__cta">SEND</button>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default BidItem;
