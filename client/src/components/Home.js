import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit('new-user', { userName });
    navigate('/auction');
  };

  return (
    <div>
      <form className="home_form" onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          className="home__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength={6}
        />
        <button className="home__cta">SIGN IN</button>
      </form>
    </div>
  );
};

export default Home;
