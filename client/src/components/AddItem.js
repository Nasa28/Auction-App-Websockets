import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddItem = ({ socket }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [current_price, setCurrent_price] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('addItem', {
      name,
      description,
      current_price,
    });
    navigate('/auction');
  };

  return (
    <div>
      <div className="addItem__container">
        <h2>Add a new product</h2>
        <form className="addItem__form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name of the Item</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="current_price">Starting price</label>
          <input
            type="number"
            name="current_price"
            value={current_price}
            onChange={(e) => setCurrent_price(e.target.value)}
            required
          />

          <button className="addItem__cta">SEND</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
