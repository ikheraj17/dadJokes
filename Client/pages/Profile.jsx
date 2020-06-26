import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Profile = () => {

    const [name, setName] = useState('woop');

    useEffect(() => {
        axios.get('/user')
          .then(user => {
              console.log(user.data.displayName);
              setName(user.data.displayName);
          })
    })

    return(
        <div>
        <p>
            Welcome, {`${name}`}!
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