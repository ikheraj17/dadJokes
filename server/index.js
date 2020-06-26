const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();
const app = express();
app.use(cors());
app.use(passport.initialize());
const port = 3000;

app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => res.send('Express World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));