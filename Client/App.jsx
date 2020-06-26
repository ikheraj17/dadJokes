import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import history from './history';
import UserProvider from './contexts/UserProvider.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {


    return (
        <Router history={history}>
            <UserProvider>
                <Route path='/profile' component={Profile} />
            </UserProvider>
            <Route path = '/' exact component={Home} />
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));