import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL_API } from "./base1";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    email: "",
    experience: "1",
    password: "",
    repassword: "",
    role: "admin",
    startDate: "",
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
      alert("Passwords do not match!");
      console.error("Passwords do not match!");
      return;
    }

    // Add any other form submission logic here (e.g., API calls)
    try {
      const response = await fetch(`${BASE_URL_API}/reg_admin.php`, {
      //const response = await fetch(`${BASE_URL_API}/register-admin`, {
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
          experience: "1",
          password: "",
          repassword: "",
          role: "admin",
          startDate: "",
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
            <h1>ADMIN REGISTRATION</h1>
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
                value={formData.email}
              />

              <label htmlFor="experience">Experience:</label>
              <select
                id="experience"
                name="experience"
                onChange={handleChange}
                value={formData.experience}
              >
                <option value="1">1</option>
                <option value="2">1-3</option>
                <option value="3">3-5</option>
                <option value="4">5-10</option>
                <option value="5">10+</option>
              </select>

              <label>Role:</label>
              <input
                type="radio"
                id="role"
                name="role"
                value="admin"
                checked
                readOnly
              />
              <label htmlFor="role">admin</label>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                onChange={handleChange}
                value={formData.startDate}
              />

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

              <button type="submit">Register as Admin</button>
              <div className="signup">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterAdmin;
