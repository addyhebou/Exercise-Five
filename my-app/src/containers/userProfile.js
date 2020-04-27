import React from 'react';

function UserProfile({ userInformation }){
    console.log(`hello`, userInformation);
    return(
        <div>
            <h1>User Profile</h1>
            <p>User Email: {userInformation.email}</p>
        </div>
    );

}

export default UserProfile;