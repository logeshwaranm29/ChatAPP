const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/MessageSchema');
const app = express();  
app.use(express.json()); /// use means it is middleware express conver to json
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {                     
  cors: {    // cross origin resource sharing  can access different domain 
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});

const mongoURI = 'mongodb://127.0.0.1:27017/chatapp'

mongoose.connect(mongoURI,{useNewUrlParser :true, useUnifiedTopology : true })
  
   .then(()=> console.log('Connected To MongoDB'))
   .catch((err)=> console.log('MongoDB connection is error:',err));

// route get msg from the room


app.get('/messages/room',async(req,res)=>{
   try{
        const messages =  await Message.find({room:req.params.room });

        res.json(messages);

   }
  catch(err){

          
       res.status(500).json({error:'Failed to fetch Messages'});
       
  }

     
});


// Route save msg


app.post('/messages',async(req,res)=>{

          
      const {username,room,message} = req.body;

      try{
      
           const newMessage = new Message({username,room,message});

           await newMessage.save();

           res.status(201).json(newMessage);
      }
       
      catch(err){

            res.status(500).json({error :'Failed to save the message'});
          
      }
          
     
});


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('chat message', (data) => {
    console.log(`Message received in room ${data.room}:`, data);
    io.to(data.room).emit('chat message', data);  //  send msg to all connected clients 
  });


  // for  file upload  to the room 
  socket.on('chat file', (data) => {
    io.to(data.room).emit('chat file', data);
  });
  


  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT =5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}}`);
});
