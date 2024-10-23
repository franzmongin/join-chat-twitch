import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import useChat from "./useChat";

function MessageInput({ setUserScrolledUp }) {
  const [messageInputContent, setMessageInputContent] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [inputHovered, setInputHovered] = useState(false);
  const [inputFocused, setInputFocused] = useState(false); // Track focus state

  const { socketRef } = useChat();

  const handleSubmit = () => {
    if (messageInputContent.trim() === "") return;
    socketRef.current.emit("send-message", {
      text: messageInputContent,
      type: "text",
      user: { username: "Thibaut", color: "#cc99ff" },
    });
    setMessageInputContent("");
    setUserScrolledUp(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessageInputContent((prev) => prev + emojiData.emoji);
    setEmojiPickerVisible(false);
  };

  const inputStyle = {
    height: "40px",
    width: "100%",
    outline: "none",
    padding:
      inputFocused || inputHovered
        ? "10px 38px 10px 8px"
        : "10px 40px 10px 10px",
    boxSizing: "border-box",
    border: inputFocused
      ? "3px solid #5c16c5"
      : inputHovered
      ? "3px solid #999"
      : "1px solid #ccc",
  };

  return (
    <div style={{ position: "relative", height: "40px", fontSize: "13px" }}>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <input
          onMouseEnter={() => setInputHovered(true)}
          onMouseLeave={() => setInputHovered(false)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={inputStyle}
          type="text"
          onChange={(e) => {
            setMessageInputContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          value={messageInputContent}
          placeholder="Send a message"
        />

        <button
          onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
          style={{
            position: "absolute",
            right: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            padding: "0",
            background: "white",
          }}
        >
          😊
        </button>
      </div>

      {/* Emoji Picker */}
      {emojiPickerVisible && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          style={{ position: "absolute", bottom: "60px" }}
        />
      )}
    </div>
  );
}

export default MessageInput;
