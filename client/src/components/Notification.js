import React, { useState, useEffect } from 'react';

const Notification = ({ socket }) => {
  const [notification, setNotification] = useState('');
  const [join, setJoin] = useState('');
  const [winner, setWinner] = useState('');
  useEffect(() => {
    socket.on('bidItemResponse', (data) => {
      setNotification(
        `@${data.last_bidder} just bid ${data.name} for $${Number(
          data.amount,
        ).toLocaleString()}`,
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on('joinUserResponse', (data) => {
      setJoin(`@${data.userName} has Joined`);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('winner', (data) => {
      setWinner(data);
    });
  }, [socket]);

  return (
    <div>
      <div>
        <p style={{ color: 'red' }}>{notification}</p>
        <p style={{ color: 'red' }}>{join}</p>
        <p style={{ color: 'red' }}>{winner}</p>
      </div>
    </div>
  );
};

export default Notification;
