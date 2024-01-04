import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css"; // Import the CSS
import { BASE_URL_API } from "./base1";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("forgot-password-page");
    return () => {
      document.body.classList.remove("forgot-password-page");
    };
  }, []);

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${BASE_URL_API}/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mailid: email }),
        });

        const responseData = await response.json();

        // Check if the response status is OK (200-299)
        if (response.ok) {
            setMessage(responseData.message);
        } else {
            // Handle API errors (e.g., 400 or 500 series responses)
            setMessage("Error: " + responseData.message);
        }
    } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
    }*/
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${BASE_URL_API}/request_reset.php`, {
          mailid: email,
        });
        setMessage(response.data.message);
        if (response.data.success) {
          setMessage("Please check your email for password reset instructions.");
        } else {
          setMessage("Error: " + response.data.message);
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
};


  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="submit" value="Reset Password" />
      </form>
      {message && <div className="message">{message}</div>}
      Remembered? <Link to="/login">Login</Link>
    </div>
  );
}

export default ForgotPassword;
