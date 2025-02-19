import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './MessageList';

// Create socket connection
const socket = io('http://localhost:3001'); // Ensure backend server is running on this port

const Chat = ({ room, username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Join the room and listen for events
  useEffect(() => {
    socket.emit('join room', room);

    // Listen for incoming chat messages
    socket.on('chat message', (data) => {
      console.log('Received message:', data); // Debug incoming data
      setMessages((prevMessages) => [...prevMessages, data]); // Update state
    });

    // Rejoin the room if the socket reconnects
    socket.on('connect', () => {
      console.log('Socket reconnected, joining room:', room);
      socket.emit('join room', room);
    });

    // Cleanup on unmount
    return () => {
      socket.off('chat message'); // Unsubscribe from the "chat message" event
      socket.emit('leave room', room); // Leave the room (optional)
    };
  }, [room]);

  // Send a message
  const sendMessage = () => {
    if (message.trim() !== '') {
      const data = { room, message, user: username };
      socket.emit('chat message', data); // Send to backend
      setMessage(''); // Clear input field
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Room: {room}</h2>
      <MessageList messages={messages} />
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '5px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
