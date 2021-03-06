import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

class ShoppingCar extends React.Component {
  constructor() {
    super();
    this.state={
      msg:'',
      snackBar:false,
      shops:[],
      username:''
    }
  }
  componentWillMount(){
    axios.request({url:'http://api.duopingshidai.com/shopping/get',method:'get',headers: {'Authorization': localStorage.userId}})
      .then(res => {
        console.log(res);
        this.setState({shops:res.data.user.shops})
        this.setState({username:res.data.user.username})
        this.setState({msg:res.data.msg})
        this.setState({snackBar:true})
      })
      .catch(err => {
        if(err.response){
          alert(err.response.data.msg);
        }else{
          console.log('Error',err);
        }
      })
  }
  handlePay(){

  }
  render(){
    // console.log(this.state.shops);
    return(
      <MuiThemeProvider>
        <div style={{textAlign:'center'}}>
          <h3>{this.state.username}的购物车</h3>
          <Table style={{width:'80%',margin:'0 auto'}}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>创建时间</TableHeaderColumn>
                <TableHeaderColumn>支付状态</TableHeaderColumn>
                <TableHeaderColumn>去支付</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow> */}
              {this.state.shops.map(item =>
                <TableRow key={Math.random()}>
                  <TableRowColumn>{item._id}</TableRowColumn>
                  <TableRowColumn>{item.createdAt}</TableRowColumn>
                  <TableRowColumn>{item.pay ? '已支付' : '未支付'}</TableRowColumn>
                  <TableRowColumn><IconButton onTouchTap={this.handlePay.bind(this)}><ShoppingCart /></IconButton></TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Snackbar
            open={this.state.snackBar}
            message={this.state.msg}
            autoHideDuration={2000}
            onRequestClose={() => this.setState({snackBar:false})}
            bodyStyle={{textAlign:'center'}}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ShoppingCar;
