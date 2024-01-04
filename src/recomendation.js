import React, { useState } from "react";
import "./style.css";
import { BASE_URL_API } from "./base1";

const Recommendations = () => {
  const [validateContent, setValidateContent] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [recipients, setRecipients] = useState({
    admin: false,
    instructors: false,
  });
  const [classID, setClassID] = useState("");

  const handleCheckboxChange = (e) => {
    setRecipients((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let recipientEmails = [];

    if (recipients.instructors && classID) {
      try {
        //const instructorEmailResponse = await fetch(`${BASE_URL_API}/getInstructorEmailByClassID.php?classID=${classID}`);
        const instructorEmailResponse = await fetch(
          `${BASE_URL_API}/getInstructorEmailByClassID?classID=${classID}`
        );
        const instructorEmailData = await instructorEmailResponse.json();
        if (instructorEmailData.email) {
          recipientEmails.push(instructorEmailData.email);
        } else {
          // Handle the case where there is no instructor or class ID is invalid
          alert(
            instructorEmailData.message ||
              "No instructor found for the given Class ID."
          );
          return; // Stop further processing
        }
      } catch (error) {
        console.error("Error fetching instructor email:", error);
        return; // Stop further processing
      }
    }

    if (recipients.admin) {
      //const adminEmailsResponse = await fetch(`${BASE_URL_API}/getAllAdminEmails.php`);
      const adminEmailsResponse = await fetch(
        `${BASE_URL_API}/getAllAdminEmails`
      );
      const adminEmailData = await adminEmailsResponse.json();
      recipientEmails = [...recipientEmails, ...adminEmailData.emails];
    }

    Promise.all(
      recipientEmails.map((email) => {
        return fetch(`${BASE_URL_API}/sendqamal.php`, {
        //return fetch(`${BASE_URL_API}/sendMail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: email,
            subject: "Recommendation",
            message: `${validateContent} - ${recommendation}`,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log("Recommendation sent successfully to:", email);
              return true;
            } else {
              console.error(
                "Error sending recommendation to:",
                email,
                "Error:",
                data.error
              );
              return false;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            return false;
          });
      })
    ).then((results) => {
      if (results.every((res) => res)) {
        alert("Recommendation emails sent successfully to all recipients!");
      } else {
        alert(
          "Some recommendation emails were not sent successfully. Check the console for details."
        );
      }
      // Clear the form fields here
      setValidateContent("");
      setRecommendation("");
      setRecipients({
        admin: false,
        instructors: false,
      });
      setClassID("");
    });
  };

  return (
    <div className="specialcontainer">
      <div className="mainsection">
        <form className="recommendationForm" onSubmit={handleSubmit}>
          <label htmlFor="validateContent">Validate Content:</label>
          <input
            type="text"
            id="validateContent"
            value={validateContent}
            onChange={(e) => setValidateContent(e.target.value)}
            required
          />

          <label htmlFor="specificRecommendation">
            Specific Recommendations:
          </label>
          <textarea
            id="specificRecommendation"
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            placeholder="Enter your detailed recommendations here..."
          ></textarea>

          <label>Send Recommendation To:</label>
          <div>
            <input
              type="checkbox"
              id="admin"
              name="admin"
              checked={recipients.admin}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="admin">Admin</label>
            <input
              type="checkbox"
              id="instructors"
              name="instructors"
              checked={recipients.instructors}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="instructors">Instructors</label>
          </div>

          {recipients.instructors && (
            <div>
              <label htmlFor="classID">Enter ClassID:</label>
              <input
                type="text"
                id="classID"
                value={classID}
                onChange={(e) => setClassID(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit">Submit Recommendation</button>
        </form>
      </div>
    </div>
  );
};

export default Recommendations;
