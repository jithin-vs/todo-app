
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

  const handleUsernameChange = (value) => setUsername(value);
  const handlePasswordChange = (value) => setPassword(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username,password);  
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });
      console.log(response);
      if (response.token) {
        const token = response.data.token;
        const userData = response.data.userData;
        localStorage.setItem('token', token);
        navigate('/home')
      }

    } catch (err) {
      console.log('error connecting to server:',err);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} >
        <h2>Login</h2>
          <TextField inputType ='text'  onChange={handleUsernameChange}/> 
          <TextField inputType='password' onChange={handlePasswordChange}/>
          <Button onClick={handleSubmit}>Login</Button>
        <div className="new-user-link">
          <Link to="/register">Create a new user</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
