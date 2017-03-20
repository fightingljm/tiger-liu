import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class Goods extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  handleAdd(){
    axios.post('http://api.duopingshidai.com/category',{name:'生鲜'})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        if(err.response){
          alert(err.response.data.msg);
        }else{
          console.log('Error',err);
        }
      })
  }
  render(){
    return(
      <div>
        <MuiThemeProvider>
          <RaisedButton label="添加商品分类" onTouchTap={this.handleAdd.bind(this)}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Goods;
