import React from 'react';
import './App.css';
import Birthday from './Birthday';
import { Route, Switch } from 'react-router-dom';
import RouterBirthday from './RouterBirthday';
import Generate from './Generate';

function App() {
  return (
    <div className='App'>
      {/* Floating particles for background animation */}
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      <div className='particle'></div>
      
      <Switch>
        <Route exact path='/' component={Birthday} />
        <Route
          exact
          path='/birthday/:name?/:day?/:month?'
          component={RouterBirthday}
        />
        <Route exact path='/generate' component={Generate} />
      </Switch>
    </div>
  );
}

export default App;
