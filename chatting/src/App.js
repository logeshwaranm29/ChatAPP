import React, { useState } from 'react';
import './components/App.css';
import Chat from './components/third';
import img from './f3.webp'

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (username.trim() !== '' && room.trim() !== '') {
      setJoined(true); 
    }
  };

  return (

    <div>  

    <div style={{ padding: '20px', textAlign: 'center' }}>
      {!joined ? (
        <div className='Main-chat'>
          <h1 className='gradient-text' >Welcome to Group Chat</h1>
           <img alt='image' src={img}/>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: '10px',
                width: '200px',
                marginRight: '10px',
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              style={{
                padding: '10px',
                width: '200px',
                marginRight: '10px',
              }}
            />
          </div>
          <button
            onClick={joinRoom}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px',
              width:'80px'
            }}
          >
            Join
          </button>
      
        
        </div>
      ) : (

      
        <>

        <Chat room={room} username={username} />

        </>
      
      )}

    </div>

    </div>

  );
};

export default App;
