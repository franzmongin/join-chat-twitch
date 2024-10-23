import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const CONNECTION_URL = "wss://api.dev.stories.studio/";
const SOCKET_PATH = "/interview-test";
const SOCKET_TRANSPORTS = ["websocket"];

const connectSocket = () => {
  const socket = io(CONNECTION_URL, {
    transport: SOCKET_TRANSPORTS,
    path: SOCKET_PATH,
  });
  return socket;
};

function useChat() {
  const [messages, setMessages] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;
    socketRef.current.on("new-message", (...args) => {
      console.log(...args);
      setMessages((prev) => {
        return [...prev, ...args];
      });
    });

    return () => socketRef.current.close();
  }, [setMessages]);
  return {
    messages,
    setMessages,
    socketRef,
  };
}

export default useChat;
