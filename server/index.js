const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('./db/models/user.js');
mongoose.connect('mongodb://localhost/dadJokes', {useNewUrlParser: true, useUnifiedTopology: true});
const path = require('path');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const cron = require("node-cron");
const axios = require('axios');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
app.use(cors());
app.use(passport.initialize());
let user = {};

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, 
    (accessToken, refreshToken, profile, cb) => {
        user = {...profile};
        User.findById({_id: profile.id, name: profile.displayName, photo: profile.photos[0].value}, (err, user) => {
            if(err) {
                console.log("There was a findbyid issue");
            } else {
                if(user === null) {
                    User.create({_id: profile.id, name: profile.displayName, photo: profile.photos[0].value}, (err, res) => {
                        if(err) {
                            console.log("error creating entry")
                        } else {
                            console.log("SUCCESS");
                            return cb(err, res);
                        }    
                });

            } else {
                return cb(null, user);
            }
            
        };
    })}));

app.use(express.static(__dirname + '/../public'));

app.use(bodyParser.json());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    res.redirect('/profile');
});

app.get('/user', (req, res) => {
    res.send(user);
});

app.get('/dbuser', (req, res) => {
    User.findOne({_id: user.id}, (err, doc) => {
        res.send(doc);
    });
});

app.post('/subscribe', (req, res) => {
    if(req.body.phone.toString().length !== 10) {
        res.send("You must enter a valid phone number");
        return;
    } else {
        User.findOneAndUpdate({_id: req.body.id}, {phone_number: req.body.phone}, {new: true}, (err, doc) => {
            console.log("New doc: ", doc);
        });
        res.send("You have successfully added your phone to the DadJokes database");
    }
})

app.get('/auth/logout', (req, res) => {
    console.log('logging out!');
    user = {};
    res.redirect('/');
});

app.get('/unsubscribe', (req, res) => {
    console.log(user.id);
    User.deleteOne({_id: user.id}, (err, response) => {
        if (err) console.log(err);
        if (response) console.log(response);

    });
    console.log('User ubsubscribed');
    res.redirect('/');
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

// cron.schedule("* * * * *", () => {
//     let results = [];
//     User.find({}, (err, docs) => {
//         if(err) {
//             console.log("error pulling phone numbers");
//         } else {
//             console.log(docs);
//             for(var i = 0; i < docs.length; i ++) {
//                 if(docs[i].phone_number !== null) {
//                     results.push(docs[i].phone_number.toString());
//                     axios.get('https://icanhazdadjoke.com/',{
//         headers:{
//             'accept': 'application/json'
//     }})
//       .then(res => {
//           console.log(results);
//         for(var j = 0; j < results.length; j ++) {
//             twilio.messages.create({
//                 body: res.data.joke,
//                 from: '+17133520619',
//                 to: `+1${results[j]}`
//             })
//               .then(message => console.log("message sent"))
//               .catch(err => console.log(err));
//         }
//       })
//                 }
//             }
//         }
//     })
// })

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));