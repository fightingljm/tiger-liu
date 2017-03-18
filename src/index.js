import React from 'react';
import { render } from 'react-dom';

// import App from './App';
import Routers from './routes.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './main.css'

render(<Routers />, document.getElementById('root'));
