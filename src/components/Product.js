import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Product extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div>
        <MuiThemeProvider>
          <div>
            Product
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Product;
