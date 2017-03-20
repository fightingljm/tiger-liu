import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header.js';

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
        {this.props.children}
      </div>
    )
  }
}

export default App;
