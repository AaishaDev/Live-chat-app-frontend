import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIo from "socket.io-client";
import Message from "../message/Message";
import send from "../../images/send.svg";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket = "";

function Chat() {
  const { user } = useParams();
  // console.log("chat", user);
  const ENDPOINT = "https://live-chat-app-production.up.railway.app/";

  const [inputVal, setInputVal] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(user);
  const [left, setleft] = useState('');
  const [render, setrender] = useState(0);

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      // alert("new client connection");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", ({ user, message }) => {
      // console.log(user, message);
    });

    socket.on("userJoined", ({ user }) => {
      // console.log("brodcast joined", user);
      setJoined(user)
    });

    socket.on("userLeft", ({ user }) => {
      // console.log("user left", user);
      setleft(user)
    });

    return () => {
      socket.off();
    };
  }, [user]);

  const sent = () => {


    if(inputVal)socket.emit("message", { message: inputVal, id });

    setInputVal("");
  };

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  useEffect(()=>{
    const element = document.querySelector(".connected");
      element.style.display = "block";

      setTimeout(() => {
        element.style.display = "None";
        
      }, 4000);
  },[joined])
  useEffect(()=>{
 
    setrender(prev=>prev+1)

    
    if(render>1){
      const element = document.querySelector(".user_left");
    element.style.display = "block";

    setTimeout(() => {
      element.style.display = "none";
      
    }, 4000);
    }
    
  },[left])

  return (
    <div className="chat-page">
      <div className="chat-page_header">
       <a href="/">
       <div className="back">
          {" "}
          <span>&#8249;</span> Back{" "}
        </div>
       </a>
        <p className="welcome">Welcome! {user}</p>
      </div>
      {/* <p className="connected">{joined}</p> */}

      <ReactScrollToBottom className="chat-page_chat_box">
        <div className="chat-page_chat_box">
          

          {messages.map((item) => (
            <Message
              message={item.message}
              name={item.user === user ? null : item.user}
              classSet={item.user === user ? "left" : "right"}
            />
          ))}
        </div>
        <p className="connected">{user===joined?"You":joined} joined</p>
          <p className="user_left">{user===left?"You":left} left</p>
      </ReactScrollToBottom>
      <div className="chat-page_message_send">
        <input
          value={inputVal}
          onKeyPress={(event) => event.key === 'Enter' ? sent() : null}
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
          placeholder="Message"
        />

        <div className="send_button" onClick={sent}>
          <img width={"20px"} src={send} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
