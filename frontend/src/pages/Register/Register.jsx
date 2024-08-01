import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import TextField from "../../components/TextField/TextField.jsx";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRePasswordChange = (e) => setRePassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      console.log(
        "Passwords do not match. Please make sure the passwords match."
      );
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        email,
        username,
        password,
      });
      console.log(response);
    } catch (err) {
      console.log("Error connecting to server:", err);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <TextField inputType="text" label="Name" onChange={handleNameChange}>Name</TextField>
        <TextField inputType="email" label="Email" onChange={handleEmailChange}>Email</TextField>
        <TextField inputType="text"  label="Username" onChange={handleUsernameChange}>Username</TextField>
        <TextField inputType="password" label="Password" onChange={handlePasswordChange}>Password</TextField>
        <TextField inputType="password" label="Re-enter Password" onChange={handleRePasswordChange}>Re enter Password</TextField>
        <Button btnType='submit' onClick ={handleSubmit}>Register</Button>
        <div className="login-link">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
