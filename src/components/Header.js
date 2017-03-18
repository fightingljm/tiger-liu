// import React from 'react';
//
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import ActionHome from 'material-ui/svg-icons/action/home';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
// import Dialog from 'material-ui/Dialog';
//
// class Header extends React.Component {
//   constructor() {
//     super();
//     this.state={
//       open: false,
//       signup: false,
//       login: false
//     }
//   }
//   handleTouchTap(event){
//     event.preventDefault();
//     this.setState({
//       open: true,
//       anchorEl: event.currentTarget,
//     })
//   }
//   handleRequestClose() {
//     this.setState({
//       open: false,
//     })
//   }
//   handleOpenSignup() {
//     this.setState({open: false});
//     this.setState({signup: true});
//   }
//   handleOpenLogin() {
//     this.setState({open: false});
//     this.setState({login: true});
//   }
//   handleClose() {
//     this.setState({login: false});
//     this.setState({signup: false});
//   }
//   render(){
//     const styles = {
//       title: {
//         cursor: 'pointer',
//       },
//     }
//     const actions = [
//       <FlatButton
//         label="Cancel"
//         primary={true}
//         onTouchTap={this.handleClose.bind(this)}
//       />,
//       <FlatButton
//         label="Submit"
//         primary={true}
//         // disabled={true}
//         onTouchTap={this.handleClose.bind(this)}
//       />,
//     ]
//     return(
//       <div>
//         <AppBar
//           title={<span style={styles.title}>Home</span>}
//           iconElementLeft={<IconButton><ActionHome /></IconButton>}
//           iconElementRight={<FlatButton onTouchTap={this.handleTouchTap.bind(this)} label="Click me"/>}
//         />
//         <Popover
//           open={this.state.open}
//           anchorEl={this.state.anchorEl}
//           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//           targetOrigin={{horizontal: 'left', vertical: 'top'}}
//           onRequestClose={this.handleRequestClose.bind(this)}
//           animation={PopoverAnimationVertical}
//         >
//           <Menu>
//             <MenuItem primaryText="Sign up" onTouchTap={this.handleOpenSignup.bind(this)}/>
//             <MenuItem primaryText="Login" onTouchTap={this.handleOpenLogin.bind(this)}/>
//           </Menu>
//         </Popover>
//         <Dialog
//           title="注册"
//           actions={actions}
//           modal={true}
//           open={this.state.signup}
//         >
//           Only actions can close this dialog.
//         </Dialog>
//         <Dialog
//           title="登录"
//           actions={actions}
//           modal={true}
//           open={this.state.login}
//         >
//           Only actions can close this dialog.
//         </Dialog>
//       </div>
//     )
//   }
// }
//
// export default Header;


import React from 'react';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class Header extends React.Component{
  constructor(){
    super();
    this.state={
      open: false,
      action:'signin',
      username:'',
      password:'',
      welcome:'登录/注册'
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
        this.setState({open:false})
        if(this.state.action=='signin'&&res.data.msg=='登陆成功'){
          this.setState({welcome:`你好,${res.data.user}!欢迎登录!`})
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
            onRightIconButtonTouchTap={this.handleOpen.bind(this)}
            iconElementRight={<FlatButton label={this.state.welcome} />}
          />
        </div>
        {/* <div className='loginout'>{this.state.welcome!='登录/注册'&&this.state.welcome!='' ? <RaisedButton label='退出'/> :  <div></div>}</div> */}
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
      </div>
    )
  }
}

export default Header;
