const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();
const app = express();
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
        console.log(JSON.stringify(profile));
        user = {...profile};
        return cb(null, profile);
    }));

app.use(express.static(__dirname + '/../public'));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
    res.redirect('/profile');
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

app.get('/', (req, res) => res.send('Express World!'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));