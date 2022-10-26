import Home from './components/Home';
import Auction from './components/Auction';
import { Route, Routes } from 'react-router-dom';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:5000');
function App() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
