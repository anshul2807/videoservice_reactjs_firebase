import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from './Context/User';
import {VideosProvider} from './Context/Videos'
import {LoginProvider} from './Context/Login'


ReactDOM.render(
  <Router>
    <LoginProvider>
   
    <VideosProvider>
    <UserProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UserProvider>
  </VideosProvider>
  
  </LoginProvider>
  </Router>,
  document.getElementById('root')
);
