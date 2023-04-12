import React, {useState, useRef, useEffect, useMemo} from "react"
import { socket, userId } from './services/socket';

import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [id, setId] = useState('')
  const [user, setUser] = useState('')
  const [trainingId, setTrainingId] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function onConnect() {
      console.log("CONECTADO", socket.id)
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("DESCONECTADO")
      setIsConnected(false);
    }

    function onMessage(message) {
      console.log(message)
      setMessages(message)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat.message', data => onMessage(data));

    setId(userId)

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  function handleSubmit() {
    socket.emit('sendMessage', {
      author: user,
      trainingId,
      message,
    })
  }
  
  return (
    <div className="app">
      <div className="chat">
        <div className='header'>
          <input 
            className='inputHeader' 
            type="text" 
            name="username" 
            placeholder="username" 
            value={user.name} 
            onChange={(event) => setUser({
              id,
              name: event.target.value,
              avatar: 'https://gravatar.com/avatar/7a5dc4644e274af020da6dd3f4e00dde?s=400&d=robohash&r=x',
              status: 'online',
              blocked: false
            })}
          />
          <input 
            className='inputHeader' 
            type="text" 
            name="productId" 
            placeholder="product_id" 
            value={trainingId}
            onChange={(event) => setTrainingId(event.target.value)}
          />
        </div>
          <div class="messages">
            {messages.length > 0 && (
              messages.map(message => (
                <div class="message">
                  <strong>{message.author.name}</strong>: {message.message}
                </div>
              ))
            )}
          </div>
          
          <div className='wrapperSend'>
            <input type="text" name="message" placeholder="mensagem" onChange={(event) => setMessage(event.target.value)} />
            <button onClick={handleSubmit}>Send</button>
          </div>
      </div>

      <div>
        <button onClick={() => socket.emit("user.block", {userId})}>BLOCK</button>
        <button onClick={() => socket.emit("user.unblock", {userId})}>UNBLOCK</button>
      </div>
    </div>
  );
}

export default App;
