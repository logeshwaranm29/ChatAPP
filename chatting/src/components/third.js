import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FaVideo } from 'react-icons/fa';
import { BsThreeDotsVertical } from "react-icons/bs";
import Second from './second.js';
import First from './first.js';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePaperClip } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { useRef } from 'react';
import { HiOutlinePaperAirplane } from "react-icons/hi2";

const socket = io('http://localhost:5000');

const Chat = ({ room, username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/messages/${room}`)
      .then(res => res.json())
      .then(data => setMessages(data));

    socket.emit('join room', room);

    socket.on('chat message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('connect', () => {
      socket.emit('join room', room);
    });

    socket.on('chat file',(data)=>{   
      setMessages((prevMessages) => [...prevMessages, data]);
    })

    return () => {
      socket.off('chat message');
      socket.emit('leave room', room);
      socket.off('chat file')
    };
  }, [room]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, room, message }),
      });

      const data = { room, message, user: username };
      socket.emit('chat message', data);
      setMessage('');
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji); 
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  
      sendMessage();
    }
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Convert the file to a base64 string for easier transport
      reader.onload = () => {
        const fileData = reader.result;
        const fileType = file.type;
  
        const fileMessage = {
          room,
          user: username,
          file: fileData,
          type: fileType,
          fileName: file.name
        };
         
        // Send file message to the server and through the socket
        socket.emit('chat file', fileMessage);
      };
  
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <First />
        <Second username={username} messages={messages} />

        <div ref={scrollRef} className="third-main-container">
          <div className="third-container-1">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', marginLeft: '20px' }}>
                <div className="second-container-1">
                  <img
                    className="profile-img"
                    src={`https://picsum.photos/seed/${username}/50`}
                    alt={`${username}'s avatar`}
                  />
                </div>
                <div className="userName-container">
                  <h4>{username}</h4>
                  <p>Online</p>
                </div>
              </div>
              <div className="usercall-icons">
                <FaPhoneAlt />
                <FaVideo />
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>

          <div className="third-container-2">
            <div style={{ marginTop: '22px', marginLeft: '110vh' }}>
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${
                    msg.user === username ? "message-left" : "message-right" 
                  }`} style={{ display: 'flex', marginBottom: '5px' }}>
                  <img
                    src={`https://picsum.photos/seed/${msg.user}/40`}
                    alt={`${msg.user}'s avatar`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  />
                  <div className="Message">
                    <strong style={{ marginLeft: "4px" }}>
                      {msg.user} <span>{msg.message}</span>
                    </strong>
                 
                  {msg.file && (
                    msg.type.includes('image') ? (
                      <img
                        src={msg.file}
                        alt={msg.fileName}
                        style={{width:'100%',maxWidth:'240px', height: 'auto', marginTop: '5px',backgroundSize:'cover',marginRight:'20px'}}
                      />
                    ) : (
                      <a href={msg.file} download={msg.fileName}>
                        {msg.fileName}
                      </a>
                    )
                  )}


                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="third-container-3">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ display: 'flex', marginTop: '10px' }}>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Message"
                  style={{ width: '900%' }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyDown}
                />
                <span onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <BsEmojiSmile className="emoji-toggle-btn" />
                </span>

                 <input
                  type="file"
                  id="file-input"
                  style={{ display: 'none' }}
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                />
              <label htmlFor="file-input">
                <HiOutlinePaperClip className="emoji-pin" />
              </label>


                <span onClick={sendMessage}>
                  <HiOutlinePaperAirplane  className="Send-btn"/>
                </span>
              </div>
            </div>
          </div>

          {showEmojiPicker && (
            <EmojiPicker
              className="emoji-picker-custom"
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
