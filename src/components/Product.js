import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

class Product extends React.Component {
  constructor() {
    super();
    this.state={
      msg:'',
      snackBar:false,
      name: '',
      summary: '',
      price: 0,
      poster: '', //注意这里传入外部链接
      category: '', //注意这里的所属分类需要的是分类集合的_id，你需要现获取到对应分类的_id
      detail:'',
      getMsg:{},
      delete:'',
      products:[]
    }
  }
  handleAdd(){
    axios.post('http://api.duopingshidai.com/product/new',{name:`${this.state.name}`,summary:`${this.state.summary}`,price:`${this.state.price}`,poster:`${this.state.poster}`,category:`${this.state.category}`})
      .then(res => {
        console.log(res);
        this.state.products.push(res.data.product)
        this.setState({products:this.state.products})

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
  // 58cf610281eaba5480e08b90
  handleGet(){
    axios.get(`http://api.duopingshidai.com/product/detail/${this.state.detail}`)
      .then( res => {
        console.log(res);
        this.setState({getMsg:res.data.product})
      })
    console.log(this.state.getMsg.name);
  }
  handleDelete(id){
    const post = this.state.products.filter(item => item._id!=id)
    this.setState({ products: post })
    let _id = id || this.state.delete
    axios.delete(`http://api.duopingshidai.com/product/delete/${_id}`)
      .then( res => {
        console.log(res);
        this.setState({msg:res.data.msg})
        this.setState({snackBar:true})
      })
  }
  componentWillMount(){
    axios.get('http://api.duopingshidai.com/products?page=0&limit=100')
      .then( res => {
        console.log(res);
        this.setState({products:res.data.products})
      })
  }
  handleCar(id){
    axios.request({url:'http://api.duopingshidai.com/shopping/add',method:'post',headers: {'Authorization': localStorage.userId}})//,product:id,num:1
      .then(res => {
        console.log(res);
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
    // console.log(localStorage.userId);

  }
  render(){
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
      },
    }
    return(
      <div>
        <MuiThemeProvider>
          <div>

            <div style={styles.root}>
              <GridList
                cellHeight={180}
                style={styles.gridList}
              >
                <Subheader>December</Subheader>
                {this.state.products.map((item) => (
                  <GridTile
                    key={Math.random()}
                    title={item.name}
                    subtitle={<span>{item.summary} <b>{item.price}元</b></span>}
                    actionIcon={<IconButton onTouchTap={this.handleCar.bind(this,item._id)}><ShoppingCart color="white" /></IconButton>}
                  >
                    <img src={item.poster} />
                    <RaisedButton label="Delete" onTouchTap={this.handleDelete.bind(this,item._id)}/>
                  </GridTile>
                ))}
              </GridList>
            </div>

            <TextField hintText="name" floatingLabelText="name" onChange={(event,name)=>{this.setState({name})}}/>
            <TextField hintText="summary" floatingLabelText="summary" onChange={(event,summary)=>{this.setState({summary})}}/>
            <TextField hintText="price" floatingLabelText="price" onChange={(event,price)=>{this.setState({price})}}/>
            <TextField hintText="poster" floatingLabelText="poster" onChange={(event,poster)=>{this.setState({poster})}}/>
            <TextField hintText="category" floatingLabelText="category" onChange={(event,category)=>{this.setState({category})}}/><br/>
            <RaisedButton label="新增商品" onTouchTap={this.handleAdd.bind(this)}/>
            <br/>
            <TextField hintText="detail" floatingLabelText="detail" onChange={(event,detail)=>{this.setState({detail})}}/><br/>
            <RaisedButton label="获取单个商品信息" onTouchTap={this.handleGet.bind(this)}/>
            <div>
              <p>{this.state.getMsg.name}</p>
              <img src={this.state.getMsg.poster} alt=""/>
              <span>{this.state.getMsg.price}</span>
              <span>{this.state.getMsg.summary}</span>
            </div>
            <br/>
            <TextField hintText="delete" floatingLabelText="delete" onChange={(event,value)=>{this.setState({delete:value})}}/><br/>
            <RaisedButton label="删除单个商品" onTouchTap={this.handleDelete.bind(this)}/>

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

export default Product;
