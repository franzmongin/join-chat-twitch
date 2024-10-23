import React, { useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function Chat() {
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        width: "340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <MessageList
        userScrolledUp={userScrolledUp}
        setUserScrolledUp={setUserScrolledUp}
      />
      <MessageInput
        userScrolledUp={userScrolledUp}
        setUserScrolledUp={setUserScrolledUp}
      />
      {userScrolledUp && <ChatPaused setUserScrolledUp={setUserScrolledUp} />}
    </div>
  );
}

const ChatPaused = ({ setUserScrolledUp }) => {
  const [hovered, setHovered] = useState(false);

  const overlayStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "70px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    cursor: "pointer",
  };

  return (
    <div
      style={overlayStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setUserScrolledUp(false);
      }}
    >
      {hovered ? "Go to latest" : "Chat paused due to scrolling"}
    </div>
  );
};

export default Chat;
