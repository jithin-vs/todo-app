
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Button from '../../components/Button/Button.jsx';
import TextField from '../../components/TextField/TextField.jsx';
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username,password);  
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });
      console.log(response.data);
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/home');
      }

    } catch (err) {
      console.log('error connecting to server:',err);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} >
        <h2>Login</h2>
        <TextField inputType='text' value={username} onChange={handleUsernameChange} placeholder="Username" />
        <TextField inputType='password' value={password} onChange={handlePasswordChange} placeholder="Password" />
          <Button btnType='submit' onClick={handleSubmit}>Login</Button>
        <div className="new-user-link">
          <Link to="/register">Create a new user</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
