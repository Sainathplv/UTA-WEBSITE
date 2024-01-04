import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL_API } from "./base1";

const RegisterCoordinator = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    program: "Computer Science",
    password: "",
    repassword: "",
    role: "program_coordinator",
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repassword) {
      alert("Passwords do not match!");
      console.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL_API}/reg_coor.php`, {
      //const response = await fetch(`${BASE_URL_API}/register-coordinator`, {
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
          dob: "",
          email: "",
          program: "Computer Science",
          password: "",
          repassword: "",
          role: "program_coordinator",
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
            <h1>CoOrdinator REGISTRATION</h1>
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

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                onChange={handleChange}
                value={formData.dob}
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
              <label>Role:</label>
              <input
                type="radio"
                id="role"
                name="role"
                value="programcoordinator"
                checked={true} // always checked
                readOnly // readonly as requested
              />
              <label htmlFor="program_coordinator">Program Coordinator</label>

              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                onChange={handleChange}
                value={formData.startDate}
              />

              <label>Program:</label>
              <input
                type="radio"
                id="mscs"
                name="program"
                value="Computer Science"
                checked={true}
                readOnly
              />
              <label htmlFor="mscs">Master's in Computer Science</label>

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

              <button type="submit">Register as CoOrdinator</button>
              <div className="signup">
                Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default RegisterCoordinator;
