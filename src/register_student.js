import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { BASE_URL_API } from "./base1";

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    enrollmentYear: "",
    enrollmentSeason: "",
    password: "",
    repassword: "",
    role: "student" 
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repassword) {
      console.error("Passwords do not match!");
      alert("Passwords do not match!");
      setRegistrationStatus("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL_API}/reg_stud.php`, {
      //const response = await fetch(`${BASE_URL_API}/register-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (result.message) {
        alert(result.message);
        setRegistrationStatus(result.message);
        // Reset the form if registration is successful
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          dob: "",
          enrollmentYear: "",
          enrollmentSeason: "",
          password: "",
          repassword: "",
          role: "student"
        });
      } else if (result.error) {
        alert(result.error);
        setRegistrationStatus(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      setRegistrationStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <Header />
      <main>
        <section>
          <div className="registration-form">
            <h1>STUDENT REGISTRATION FORM</h1>
            {registrationStatus && <p>{registrationStatus}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                onChange={handleChange}
                value={formData.firstname}
              />

              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                onChange={handleChange}
                value={formData.lastname}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onChange={handleChange}
                value={formData.mailid}
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                onChange={handleChange}
                value={formData.dob}
              />
              {/* ... Other form elements ... */}

              <label htmlFor="role">Role:</label>
              <input
                type="radio"
                id="role_student"
                name="role"
                value="student"
                checked
                readOnly
              />
              <label>Student</label>

              <label htmlFor="enrollmentYear">Enrollment Year:</label>
              <input
                type="number"
                id="enrollmentYear"
                name="enrollmentYear"
                min="1900"
                max="2099"
                step="1"
                required
                onChange={handleChange}
                value={formData.enrollmentYear}
              />
              <label htmlFor="enrollmentSeason">Enrollment Season:</label>
              <select
                id="enrollmentSeason"
                name="enrollmentSeason"
                required
                onChange={handleChange}
                value={formData.enrollmentSeason}
              >
                <option value="">Select a Season</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={handleChange}
                value={formData.password}
              />

              <label htmlFor="repassword">Re-enter Password:</label>
              <input
                type="password"
                id="repassword"
                name="repassword"
                required
                onChange={handleChange}
                value={formData.repassword}
              />

              <button type="submit">Register as a Student</button>
              <div className="signup">
                back <Link to="/signup">Sign Up</Link>
                Already registered? <Link to="/login">Log In</Link>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterStudent;
