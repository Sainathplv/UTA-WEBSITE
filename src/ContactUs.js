import React, { useState } from "react";
import Header from "./Header"; // Adjust path as necessary
import Footer from "./Footer"; // Adjust path as necessary
import "./style.css";
import { Link } from "react-router-dom";
import { BASE_URL_API } from "./base1";

function Contact() {
  const [statusMessage, setStatusMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      const response = await fetch(`${BASE_URL_API}/contactHandler.php`, {
        method: "POST",
        body: formData,
      });

      /*const response = await fetch(`${BASE_URL_API}/submit-contact-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });*/

      const result = await response.json();
      console.log(result);

      /* // Handle success or error based on response from the server
      if (response.status === 200) {
        // Message sent successfully
        setStatusMessage(result);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        // Error sending message
        setStatusMessage(result);
      } */

      if (response.ok) {
        setStatusMessage(result.message);
        // Clear the form fields...
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatusMessage(result.error || "Error occurred");
      }
    } catch (error) {
      setStatusMessage("There was an error sending the message.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact-page-styles">
      <div className="contactPage">
        <Header />

        <main>
          <div className="contact-box">
            <h1>Contact Us</h1>
            <p>
              Have a question or need assistance? We're here to help. Please
              fill out the form below.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Said Palavala"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="saidplv@root.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Admission Request"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your message here..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <input type="submit" value="Submit" />
            </form>
            <div>
              <p>{statusMessage}</p>
              <Link to="/">Back</Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Contact;
