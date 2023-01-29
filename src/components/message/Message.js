import React from "react";

function Message({ message, name, classSet }) {
  return (
    <div>
      <div className={`chat ${classSet}`}>
        {name && <p className="name">{name}</p>}
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
