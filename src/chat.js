import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useUser } from './UserContext';
import styles from './ChatApp.module.css';
import { BASE_URL_API } from "./base";

function ChatApp() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const { userId } = useUser();
  const [lastName, setLastName] = useState("");
  const socketRef = useRef();
  const [searchedUserId, setSearchedUserId] = useState(""); // New state for search
  const [selectedUserId, setSelectedUserId] = useState(null); // New state for selected user

  useEffect(() => {
    // Fetch the user's last name using userId
    fetch(`${BASE_URL_API}/getLastName.php?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setLastName(data.lastname);
        } else {
          console.error("Error fetching last name:", data.message);
        }
      })
      .catch(err => console.error("Error fetching last name:", err));

    // The rest of your useEffect logic remains the same   http://utachatserver.eastus.cloudapp.azure.com:4000
    socketRef.current = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    // Register the user with their userId
     socketRef.current.emit("register", userId);

    socketRef.current.on("message", ({ name, message, senderId}) => {
      console.log("inside ");
      setChat(chat => [...chat, { name, message, senderId }]);
    });
    socketRef.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    return () => socketRef.current.disconnect();
  }, [chat, userId]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Function to handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Conversation started with userId: ${searchedUserId}`);
    setSelectedUserId(searchedUserId);
    setSearchedUserId(""); // Clear search bar after selection
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    let { name, message } = state;
    if (!name && lastName) {
      name = lastName;  // use the fetched last name if available
    }
    //socketRef.current.emit("message", { name, message });
    socketRef.current.emit("private message", { name, message,senderId: userId, to: selectedUserId });
    e.preventDefault();
    setChat([...chat, { name, message }]);
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message, senderId }, index) => (
      <div key={index} className={senderId === userId ? styles.myMessage : styles.theirMessage}>
        <h3>
        {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className={styles.chatCard}>
      {/* Add a search bar */}
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search by user ID"
          value={searchedUserId}
          onChange={(e) => setSearchedUserId(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      <div className={styles.renderChat}>
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <form className={styles.chatForm} onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div>
          <textarea
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            placeholder="Type your message..."
            className={styles.textarea}
          />
        </div>
        <button className={styles.button}>Send Message</button>
      </form>
    </div>
  );
}

export default ChatApp;