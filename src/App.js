import './App.css';
import {Route,Switch} from 'react-router-dom'
import Home from './Components/Home/Home.js'
import NavBar from './Components/NavBar/NavBar.js'
import Video from './Components/Video/Video.js'
import Upload from './Components/Upload/Upload.js';
import { useContext } from 'react';
import {LoginContext} from './Context/Login'
import FirstLogin from './Components/FirstLogin/FirstLogin.js'

function App() {

  const [login,setLogin] = useContext(LoginContext);
  return (
    <>
    <NavBar />
    <Switch>
      <Route path="/upload">
      {login ?  <Upload /> : <FirstLogin />}
       
      </Route>
      <Route  path="/videos/:id">
      <Video /> 
      </Route>
      <Route  path="/" >
      <Home />
      </Route>
      
    </Switch>
    </>
  );
}

export default App;
