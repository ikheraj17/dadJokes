import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import listStyles from './Profile.module.css';

const Profile = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('woop');
    const [image, setImage] = useState('bloop');
    const [phone, setPhone] = useState(null);
    const [currentNum, setCurrentNum] = useState(null);
    useEffect(() => {
        axios.get('/user')
          .then(user => {
              setName(user.data.displayName);
              setImage(user.data.photos[0].value);
              setId(user.data.id);
          })
          .then(() => {
              axios.get('/dbuser')
                .then(res => {
                    console.log(res.data.phone_number);
                    setCurrentNum(res.data.phone_number);
                })
          })

    });

    const addPhone = (e) => {
        e.preventDefault();
        let objToSend = {phone: phone, id: id};
        window.render();
        axios.post('/subscribe', objToSend)
          .then(res => {
              alert(res.data);
          })
          .catch(err => {
              console.log(err);
          })
    }

    return(
        <div className="container">
        <p className="header">
            Welcome, {`${name}`}!
            Enter your phone number below to start
            the flow of daily dad jokes straight to your 
            mobile device. 
        </p>
        <img className="photo" src={`${image}`} alt="User image"></img>
        <input className="phone" type="tel" placeholder="Enter a valid phone number" onChange={e => {setPhone(Number(e.target.value))}}></input>
        <button className="submit" onClick={addPhone}>Submit</button>
    <p>Your current phone number is: {currentNum || null}. If you'd like to change that, type a new number in the text box above!</p>
    </div>
    )
   
};

export default Profile;