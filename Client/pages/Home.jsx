import React from 'react';

const Home = () => {
    return (
        <div className="container">
            <p className="welcome">Welcome to the Wonderland of Dad Jokes!</p>
            <form action="auth/google">
                <input className="button" type="submit" value="Log in with google" />
            </form>
        </div>
    )
};

export default Home;