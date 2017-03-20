import React, { PropTypes } from 'react';
import { Router,Route,hashHistory,IndexRoute,browserHistory } from 'react-router';

import App from './App.js'
import Home from './components/Home.js'
import Category from './components/Category.js'
import Product from './components/Product.js'

export default function () {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='category' component={Category}/>
        <Route path='product' component={Product}/>
      </Route>
    </Router>
  )
}
