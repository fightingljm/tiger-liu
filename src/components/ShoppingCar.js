import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';

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
  render(){
    // console.log(this.state.shops);
    return(
      <div>
        <MuiThemeProvider>
          <div>
            <Subheader inset={true}>{this.state.username}的购物车</Subheader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>支付状态</TableHeaderColumn>
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
      </div>
    )
  }
}

export default ShoppingCar;
