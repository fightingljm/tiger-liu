import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Delete from 'material-ui/svg-icons/action/delete';

class Category extends React.Component {
  constructor() {
    super();
    this.state={
      addclass:'',
      snackBar:false,
      msg:'',
      categories:[]
    }
  }
  handleAdd(){
    axios.post('http://api.duopingshidai.com/category',{name:`${this.state.addclass}`})
      .then(res => {
        console.log(res.data.category);
        this.state.categories.push(res.data.category)

        this.setState({categories:this.state.categories})
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
  componentWillMount(){
    axios.get('http://api.duopingshidai.com/category')
      .then( res => {
        console.log(res);
        this.setState({categories:res.data.categories})
        this.setState({msg:res.data.msg})
        this.setState({snackBar:true})
      })
  }
  handleDelete(id){
    // console.log(id);
    const post = this.state.categories.filter(item => item._id!=id)
    this.setState({ categories: post })

    axios.delete(`http://api.duopingshidai.com/category?id=${id}`)
      .then( res => {
        // console.log(res);
        this.setState({msg:res.data.msg})
        this.setState({snackBar:true})
      })

  }
  render(){
    return(
      <div>
        <MuiThemeProvider>
          <div>
            <TextField hintText="add class" floatingLabelText="add class" onChange={(event,addclass)=>{this.setState({addclass})}}/>
            <RaisedButton label="添加商品分类" onTouchTap={this.handleAdd.bind(this)}/>
            {/* <RaisedButton label="获取所有分类" onTouchTap={this.handleGet.bind(this)}/> */}
            <Snackbar
              open={this.state.snackBar}
              message={this.state.msg}
              autoHideDuration={2000}
              onRequestClose={() => this.setState({snackBar:false})}
              bodyStyle={{textAlign:'center'}}
            />
            <List style={{width:'50%'}}>
              {
                this.state.categories.map(item => <ListItem key={Math.random()} primaryText={item.name} rightIcon={<Delete onTouchTap={this.handleDelete.bind(this,item._id)}/>} />)
              }
            </List>
          </div>
        </MuiThemeProvider>

      </div>
    )
  }
}

export default Category;
