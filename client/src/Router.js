import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <div>Home</div>
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/customer'>
          <div>Customer</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
