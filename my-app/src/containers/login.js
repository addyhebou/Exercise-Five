import React from 'react';
import LoginForm from "../components/LoginForm";

function Login({LoginFunction}){
    return( 
        <div>
            <h1>Login</h1>
            <LoginForm LoginFunction = {LoginFunction}/>
        </div>
    );

}

export default Login;
// default for if we want to export the whole Login page
