import React from 'react';

const Home = () => {
    return (
        <div>
            <p>Welcome to the Wonderland of Dad Jokes!</p>
            <form action="auth/google">
                <input type="submit" value="Log in with google to get started!" />
            </form>
        </div>
    )
};

export default Home;