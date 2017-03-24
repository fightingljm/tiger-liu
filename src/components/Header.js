import React from 'react';
import axios from 'axios';
import { Link,browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import Snackbar from 'material-ui/Snackbar';

class Header extends React.Component{
  constructor(){
    super();
    this.state={
      open: false,//登录注册表单的开关
      action:'signin',//登录注册表单的选项
      username:'',//表单 username
      password:'',//表单 password
      isLogin:false,//是否登录成功
      user:'',//登录后后台返回的 user
      userId:'',//登录后后台返回的 userId
      openMenu:false,//登录后弹出式菜单的开关
      snackBar:false,//登出时弹出的提示框
    }
  }
  componentWillMount(){
    if(localStorage.user&&localStorage.userId){
      this.setState({isLogin:true,user:localStorage.user,userId:localStorage.userId})
    }
  }
  handleClose(){
    this.setState({open: false})
  }
  handleOpen(){
    this.setState({open: true})
  }
  handleUsername(event,username){
    this.setState({username:username.trim()})
  }
  handlePassword(event,password){
    this.setState({password:password.trim()})
  }
  handleSubmit(){
    let data = {username:this.state.username,password:this.state.password}
    // console.log(data);
    axios.post(`http://api.duopingshidai.com/user/${this.state.action}`,data)
      .then(res => {
        console.log(res);
        this.setState({open:false,user:res.data.user,userId:res.data.userId})
        localStorage.setItem('user',res.data.user)
        localStorage.setItem('userId',res.data.userId)
        if(this.state.action=='signin'){
          this.setState({isLogin:true})
          browserHistory.push('/product');
        }
      })
      .catch(err => {
        if(err.response){
          alert(err.response.data.msg);
        }else{
          console.log('Error',err);
        }
      })
  }
  handleOnRequestChange(value){
    // console.log(value);
    this.setState({
      openMenu: value,
    })
  }
  handleItem(e,child){
    if(child.props.value==='7') this.logout();
    this.setState({openMenu:false})
  }
  logout(){
    axios.get('http://api.duopingshidai.com/user/logout')
      .then( res => {
        this.setState({isLogin:false,user:'',userId:'',snackBar:true})
        localStorage.user = '';
        localStorage.userId = '';
      })
  }
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ]
    return(
      <div className='header-wrap'>
        <div className='app-bar'>
          <AppBar
            title="Tiger_Liu"
            iconElementLeft={<IconButton><ActionHome /></IconButton>}
            iconElementRight={
              this.state.isLogin ?
                <IconMenu
                  iconButtonElement={<IconButton tooltip={`你好,${this.state.user}!`}><AccountCircle /></IconButton>}
                  open={this.state.openMenu}
                  onRequestChange={this.handleOnRequestChange.bind(this)}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  onItemTouchTap={this.handleItem.bind(this)}
                >
                  <MenuItem value="1" primaryText={`你好,${this.state.user}!`} />
                  <MenuItem value="2" primaryText="个人中心" />
                  <Link to='/' onlyActiveOnIndex={true}><MenuItem value="3" primaryText="Home"/></Link>
                  <Link to='category'><MenuItem value="4" primaryText="Category"/></Link>
                  <Link to='product'><MenuItem value="5" primaryText="Product"/></Link>
                  <Link to='shoppingcar'><MenuItem value="6" primaryText="ShoppingCar"/></Link>
                  <MenuItem value="7" primaryText="退出"/>
                </IconMenu> :
                <FlatButton label='登录/注册' onTouchTap={this.handleOpen.bind(this)}/>
            }
          />
        </div>
        <Dialog
          title="用户表单"
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}>

          <FlatButton label="登录" primary={this.state.action=='signin' ? true : false} onTouchTap={()=>this.setState({action:'signin'})}/>
          <FlatButton label="注册" primary={this.state.action=='signup' ? true : false} onTouchTap={()=>this.setState({action:'signup'})}/>

          <br />
          <TextField hintText="Username" floatingLabelText="username" onChange={this.handleUsername.bind(this)}/><br/>
          <TextField hintText="Password" floatingLabelText="Password" type="password" onChange={this.handlePassword.bind(this)}/><br/><br />
        </Dialog>

        <Snackbar
          open={this.state.snackBar}
          message="登出成功"
          autoHideDuration={2000}
          onRequestClose={() => this.setState({snackBar:false})}
          bodyStyle={{textAlign:'center'}}
        />
      </div>
    )
  }
}

export default Header;
