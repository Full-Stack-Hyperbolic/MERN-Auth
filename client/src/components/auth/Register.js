import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPasswordVerify] = useState('');

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        email,
        password,
        password2,
      };

      console.log(registerData);

      await axios.post('http://localhost:5000/auth/', registerData);
      await getLoggedIn();
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <input
          type='email'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <input
          type='password'
          placeholder='Verify your password'
          onChange={e => setPasswordVerify(e.target.value)}
          value={password2}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
