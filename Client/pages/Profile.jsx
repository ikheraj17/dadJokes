import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Profile = () => {

    const [name, setName] = useState('woop');
    const [image, setImage] = useState('bloop');

    useEffect(() => {
        axios.get('/user')
          .then(user => {
              console.log(user.data.photos[0].value);
              setName(user.data.displayName);
              setImage(user.data.photos[0].value);
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
        <img src={`${image}`} alt="User image" style={{width: 100, height: 100}}></img>
        <input type="tel" placeholder="Enter a valid phone number"></input>
        <button>Submit</button>
    </div>
    )
   
};

export default Profile;