import axios from 'axios';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function LogoutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    await axios.get('http://localhost:5000/auth/logout');
    await getLoggedIn();
    history.push('/');
  }

  return <button onClick={logOut}>Log Out</button>;
}
