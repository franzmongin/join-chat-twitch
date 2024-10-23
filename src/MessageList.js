import React, { forwardRef, useEffect, useRef } from "react";
import useChat from "./useChat";

const MessageList = forwardRef(({ userScrolledUp, setUserScrolledUp }) => {
  const { messages } = useChat();
  const chatDivRef = useRef();

  // Check if user is at the bottom of the div
  const isUserAtBottom = () => {
    const chatDiv = chatDivRef.current;
    return (
      chatDiv.scrollTop + chatDiv.clientHeight >= chatDiv.scrollHeight - 10
    );
  };

  const handleScroll = () => {
    if (!isUserAtBottom()) {
      setUserScrolledUp(true);
    } else {
      setUserScrolledUp(false);
    }
  };

  useEffect(() => {
    const chatDiv = chatDivRef.current;

    if (!userScrolledUp) {
      const lastElementChild = chatDiv.lastElementChild;
      if (lastElementChild) {
        lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [messages, userScrolledUp]);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        overflowY: "scroll",
        flexGrow: "1",
      }}
      ref={chatDivRef}
      onWheel={handleScroll}
    >
      {/* Message list */}
      {messages?.map((msg, index) => (
        <div key={`msg-${index}`} style={{ padding: "10px" }}>
          <span
            style={{
              color: msg.user.color,
              marginRight: "5px",
              fontWeight: "bold",
            }}
          >
            {msg.user.username}
          </span>
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
});

export default MessageList;
