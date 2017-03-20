import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header.js';
import NavBar from './components/NavBar.js';

class App extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div className='app'>
        <MuiThemeProvider>
          <Header/>
        </MuiThemeProvider>
        <NavBar/>
        {this.props.children}
      </div>
    )
  }
}

export default App;
