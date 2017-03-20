import React from 'react';
import { Link } from 'react-router';
class NavBar extends React.Component {
  render(){
    return(
      <div>
        <Link to='/' onlyActiveOnIndex={true}>Home</Link><br/>
        <Link to='category'>Category</Link><br/>
        <Link to='product'>Product</Link><br/>
      </div>
    )
  }
}

export default NavBar;
