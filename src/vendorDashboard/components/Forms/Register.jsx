import React, { useState } from 'react';

import { API_URL } from '../../data/apiPath';


const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })
      console.log(response)
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(data);
        setEmail("");
        setPassword(""); // Ensure case consistency
        setUsername("");
        alert("Vendor registered successfully");
        showLoginHandler();
      } else {
        console.error(`Error: ${response.status}`);
        alert(`Registration failed: ${data.message || "Unexpected error"}`);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (

    <div className='registerSection'>
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>User name</label>
        <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your name' />
        <label>Email</label>
        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />
        <label >password</label>
        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter your password' /><br />
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register