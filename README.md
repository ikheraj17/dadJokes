# dadJokes

This project is designed to allow one to send dadJokes by form of text message to a mobile number utilizing the icanhazdadjokes and Twilio API. 
User authentication is handled with Passport.js and the passport-google-oauth2 strategy. 

You can find documentation for this strategy here: http://www.passportjs.org/packages/passport-google-oauth2/

User persistence is handled via MongoDB, and user data is passed to the front end via the '/user' and '/dbuser API routes. 
The React front-end uses React Router, Hooks, and the React Context API to access protected routes

# Installation

1. Type 'npm install' in your terminal after cloning / forking the repository to install dependencies. 

2. Make sure you have MongoDB locally installed, and start the service by typing 'sudo service mongodb start' in your terminal of choice.

3. Type 'npm run build' to start the Webpack build process. 

4. Type 'npm start' and the application should be up and running at 'http://localhost:3000'

# Using the Twilio API

The free version of Twilio's API only allows you to send texts to verified numbers, which you can handle from Twilio's console once you sign up for a developer key. 

On line 14 of server/index.js, replace 'process.env.TWILIO_SID' and 'process.env.TWILIO_TOKEN' with your respective API keys. Be sure to protect them if you are committing to a public repository. 

On line 119 of server/index.js, replace the phone number you see there with your free Twilio trial phone number. You're all set!

# A note about node-cron

For testing purposes, I set node-cron to send texts to all numbers in the database every minute. That's a lot of dad jokes! Line 100 of server/index.js handles the time logic, and the functions which are executed on a schedule. 

To implement a different interval, reference the node-cron documentation here: 

https://www.npmjs.com/package/node-cron


