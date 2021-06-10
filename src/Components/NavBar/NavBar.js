import React ,{useEffect,useContext} from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'
import {authe} from '../../firebase'
import firebase from 'firebase'

import {UserContext} from '../../Context/User'
import {LoginContext} from '../../Context/Login'

function NavBar() {

    const [user,setUser] = useContext(UserContext);

    const [login,setLogin] = useContext(LoginContext);

    useEffect(()=>{
        const unsubscribe = authe.onAuthStateChanged(user =>{
            if(user){
                console.log("sign IN");
            //   console.log(user);
              setUser({
                names : user.displayName,
                email : user.email 
            })
              setLogin(true)
            }
            else{
                console.log("not sign IN");
                setLogin(false)
                setUser(null)
            }
        })

        return () => {unsubscribe();}
    },[login])

    const handleSingin = async () =>{
        var provider = new firebase.auth.GoogleAuthProvider();

       await authe.signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;
      
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          setUser({
              names : user.displayName,
              email : user.email 
          })
          console.log("success ");
          setLogin(true);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }


    const handleLogout = async () =>{
        authe.signOut().then(() => {
           console.log("Successfully Logout");
            setLogin(false)
          }).catch((error) => {
            console.log(error);
          });
          
    }

    return (
        <div className="navbar">
            <nav>
                <h1>Video Service</h1>
                <div className="navbar__search">
                    <input />
                    <a>Search</a>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {!login?(
                            <li onClick={handleSingin}>Sign In with Google</li>
                    ):(
                            <>
                            <li><Link to="/upload">UPLOAD</Link></li>
                             <li onClick={handleLogout}>Logout</li>
                            </>
                    )}
                   
                    
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
