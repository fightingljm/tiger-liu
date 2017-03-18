import React, { PropTypes } from 'react';
import { Router,Route,hashHistory,IndexRoute } from 'react-router';

import App from './App.js'
import Home from './components/Home.js'
import SignUp from './components/SignUp.js'

export default function () {
  return(
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='signup' component={SignUp}/>
      </Route>
    </Router>
  )
}
