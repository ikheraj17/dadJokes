import React, {useEffect} from 'react';
import axios from 'axios';

const Profile = () => {

    useEffect(() => {
        axios.get('/user')
          .then(user => {
              console.log(user.data);
          })
    })

    return(
        <div>
        <p>
            You have successfully logged in!
            Enter your phone number below to start
            the flow of daily dad jokes straight to your 
            mobile device. 
        </p>
        <input type="text" plcaeholder="Enter a valid phone number"></input>
        <button>Submit</button>
    </div>
    )
   
};

export default Profile;