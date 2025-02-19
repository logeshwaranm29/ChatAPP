import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        height: '300px',
        overflowY: 'scroll',
        padding: '10px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{msg.user}:</strong> {msg.message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
