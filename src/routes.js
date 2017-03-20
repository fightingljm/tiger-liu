import React, { PropTypes } from 'react';
import { Router,Route,hashHistory,IndexRoute } from 'react-router';

import App from './App.js'
import Home from './components/Home.js'
import Goods from './components/Goods.js'

export default function () {
  return(
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/goods' component={Goods}/>
      </Route>
    </Router>
  )
}
