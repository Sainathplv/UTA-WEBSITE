import React, { useState } from "react";
//import "./style.css"; // import your main stylesheet
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { BASE_URL_API } from "./base1";
import styles from './login.module.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserRole, setUserId } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send the login details to the backend for verification
      const response = await fetch(`${BASE_URL_API}/login.php`, {
      //const response = await fetch(`${BASE_URL_API}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (result.status === "success") {
        // If successful, set user details from response and navigate to appropriate dashboard
        const { userid, role } = result.data;

        setIsLoggedIn(true);
        setUserRole(role);
        setUserId(userid);
        

        // Log user details
        const logResponse = await fetch(`${BASE_URL_API}/login_logs.php`, {
        //const logResponse = await fetch(`${BASE_URL_API}/log`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userid,
            role: role,
            time: new Date().toISOString() // Logging the current time
          })
        });

        const logResult = await logResponse.json();

        // Check for an error during logging user details
        if (logResult.error) {
            console.error("Error during logging user details:", logResult.error);
            alert("An error occurred while logging user details. Please inform the admin or support team.");
            return; // Return early to prevent further navigation
        }

        switch (role) {
          case "admin":
            navigate(`/adminDashboard/${userid}`);
            break;
          case "student":
            navigate(`/studentDashboard/${userid}`);
            break;
          case "instructor":
            navigate(`/instructorDashboard/${userid}`);
            break;
          case "program_coordinator":
            navigate(`/CoordinatorDashboard/${userid}`);
            break;
          case "qaofficer":
            navigate(`/qaofficerDashboard/${userid}`);
            break;
          default:
            alert("Unknown user role");
        }
        
      } else {
        alert(result.message || "Incorrect username or password");
      }

    } catch (error) {
      console.error("Error during login", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className={styles.inputField}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.inputField}
          />
          <input
            type="submit"
            value="Login"
            className={styles.submitButton}
          />
        </form>
        <div className={styles.linkContainer}>
          <Link to="/ForgotPassword" className={styles.link}>Forgot Password?</Link>
        </div>
        <div className={styles.linkContainer}>
          Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/" className={styles.link}>Back to Homepage</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
