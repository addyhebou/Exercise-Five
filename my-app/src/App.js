import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom"
import * as firebase from "firebase/app";
import "firebase/auth";
// Pages
import CreateAccount from "./containers/CreateAccount";
import Login from "./containers/Login";
import Header from './components/Header'
import UserProfile from "./containers/UserProfile";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState({});

  const firebaseConfig = {
    apiKey: "AIzaSyDYyxmgsTMd4Ou1oVn4edWQkG6tnUm2QP4",
    authDomain: "exercise-five-cb76d.firebaseapp.com",
    databaseURL: "https://exercise-five-cb76d.firebaseio.com",
    projectId: "exercise-five-cb76d",
    storageBucket: "exercise-five-cb76d.appspot.com",
    messagingSenderId: "524105064576",
    appId: "1:524105064576:web:2106b4f161ec590eefc665"
  };

  // Ensure app is initialized when it is ready to be
  // Ensure app is not initialized more than once

  useEffect(() => {
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .auth().
      setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(e){
        console.log('AUTH ERROR', e);
      })
  },[firebaseConfig]);

  // Check to see if user is logged in
  // User loads page, check their status, set stage accordingly
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user){
      if(user){
        setUserInformation(user);
        setLoggedIn(true);
      }else{
        setUserInformation({});
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  // Login
  function LoginFunction(e){
    e.preventDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;
  

  firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response){
        console.log("LOGIN RESPONSE", response);
        setLoggedIn(true);
      })
      .catch(function(error){
        console.log("LOGIN ERROR", e);
      })
  }
  // Logout
  function LogoutFunction(){
    firebase
      .auth()
      .signOut()
      .then(function(){
        setLoggedIn(false);
      })
      .catch(function(error){
        console.log("LOGOUT ERROR", error);
      })
  }
  // Create Account
  function CreateAccountFunction(e){
    e.preventDefault();
    console.log(`form payload`, e);
    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;

    console.log('email', email);


    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response){
        console.log("VALID ACCOUNT CREATE", response);
        setLoggedIn(true);
      })
      .catch(function(e){
        console.log('what');
        console.log("CREATE ACCOUNT ERROR", e);
      })
  }


  return(
  <div className = "App">
    <Header LogoutFunction ={LogoutFunction} isLoggedIn = {loggedIn}/>
    <Router>
      <Route exact path = "/">
        {!loggedIn ? (<Redirect to = "/login" />) : (<UserProfile userInformation = {userInformation}/>)}
      </Route>
      <Route exact path = "/login">
        {!loggedIn ? (<Login LoginFunction = {LoginFunction} />) : (<Redirect to = "/"/>)}
      </Route>  
      <Route exact path = "/create-account">
        {!loggedIn ?(<CreateAccount CreateAccountFunction = {CreateAccountFunction}/>) : (<Redirect to = "/"/>)}
      </Route>
    </Router>
  </div>
  );
}

export default App;
