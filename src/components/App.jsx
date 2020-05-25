import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Dashboard from './layout/Dashboard';
import Pokemon from './pokemon/Pokemon';

function App() {

    return (
        <Router>
            <div className='App'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/pokemon/:pokemonIndex' component={Pokemon} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;