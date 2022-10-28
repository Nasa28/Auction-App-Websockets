import React, { useEffect, useState } from 'react';
import BidProduct from './BidProduct';
import CountDown from './CountDown';
import axios from 'axios';
const Item = ({ socket }) => {
  const message = 'Click on Add Item to create an auction';
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonprice, setButtonprice] = useState(undefined);
  if (!products) {
    socket.emit('noItem', { message });
  }
  const fetchItems = async () => {
    try {
      const results = await axios.get('http://localhost:5000/api');
      setLoading(false);
      setProducts(results.data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="div">
      <div className="bidding-buttons">
        <div>
          <button onClick={() => setButtonprice(14)}>14€</button>
        </div>
        <div>
          <button onClick={() => setButtonprice(16)}>16€</button>
        </div>
        <div>
          <button onClick={() => setButtonprice('Autre')}>Autre</button>
        </div>
      </div>
      <div className="item-box">
        {loading ? (
          <div>
            <p>Loading</p>
          </div>
        ) : (
         products.map((product) => (
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
              <BidProduct
                id={product.id}
                current_price={product.current_price}
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
