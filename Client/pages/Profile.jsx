import React, {useEffect, useState} from 'react';
import axios from 'axios';
import listStyles from './Profile.module.css';

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
        <div className="container">
        <p className="header">
            Welcome, {`${name}`}!
            Enter your phone number below to start
            the flow of daily dad jokes straight to your 
            mobile device. 
        </p>
        <img className="photo" src={`${image}`} alt="User image"></img>
        <input className="phone" type="tel" placeholder="Enter a valid phone number"></input>
        <button className="submit">Submit</button>
    </div>
    )
   
};

export default Profile;