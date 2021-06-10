import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from './Context/User';
import {VideosProvider} from './Context/Videos'
import {LoginProvider} from './Context/Login'
import {PlayerVideoProvider} from './Context/PlayerVideo'

ReactDOM.render(
  <Router>
    <LoginProvider>
   <PlayerVideoProvider>
    <VideosProvider>
    <UserProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UserProvider>
  </VideosProvider>
  </PlayerVideoProvider>
  </LoginProvider>
  </Router>,
  document.getElementById('root')
);
