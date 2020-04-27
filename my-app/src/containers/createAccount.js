import React from 'react';
import CreateAccountForm from "../components/CreateAccountForm";
function CreateAccount({CreateAccountFunction}){
    return( 
        <div>
            <h1>Create Account</h1>
            <CreateAccountForm CreateAccountFunction = {CreateAccountFunction}/>
        </div>
    );

}

export default CreateAccount;

/*
    component: the elements that you've created to use a tags
    container: holding those elements
*/