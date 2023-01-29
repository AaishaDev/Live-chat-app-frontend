import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"

function Join() {
  const [user, setUser] = useState("");

  return (
    <div className="start-page">
      <div className="start-page_logo">
        <img height={'100%'} src={logo} alt="" />
      </div>

      <p className="start-page_heading1">
        Live <span>Chat</span>
      </p>
      <p className="start-page_heading2">
        Welcome! Please Start to Chat
      </p>

      <input
        onChange={(e) => setUser(e.target.value)}
        type="text"
        placeholder="Enter your name"
      />
      <Link onClick={(e)=>!user?e.preventDefault():null} to={`/chat/${user}`}>
        <button>Start</button>
      </Link>
    
    </div>
  );
}

export default Join;
