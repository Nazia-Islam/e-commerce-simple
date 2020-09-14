import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFBLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  console.log(newUser)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }
  
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const fBLogin = () => {
    handleFBLogin()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;

    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  // const handleChange = (event) => {
  // console.log(event.target.name, event.target.value);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();

    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        console.log(res)
        handleResponse(res, true);
      })
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button>: 
        <button onClick={googleSignIn}>Sign in</button>   
      }
      <br/><button onClick={fBLogin}>Sign in using Facebook</button><br/>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own authentication</h1>
     
      {/* <p>Name: {user.name}</p>
      <p>Email:{user.email} | Password: {user.password}</p> */}
      
      <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)}/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        <br/>
        {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="your name"/>}
        <br/><br/>
        <input onBlur={handleBlur} name="email" type="text" placeholder="enter your email" required></input>
        <br/><br/>
        <input onBlur={handleBlur} name="password" type="password" placeholder="enter your password" required></input>
        <br/><br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>** User {newUser ? 'created' : 'sign in'} successfully **</p>}
    </div>
  );
}

export default Login;
