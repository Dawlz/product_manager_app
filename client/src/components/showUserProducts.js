import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import NavBarUnregistered from './navBarUnregistered';


const ShowDetail = (props) => {

  const [userName, setUserName] = useState('');
  const [products, setProducts] = useState([])

  const sellNow = () => {
    navigate('/signup')
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/' + props.userName)
    .then(res => {
      setUserName(res.data.userName);
      setProducts(res.data.products)
    })
  }, [props]);

  return(
    <div className = "row col-sm-100 mx-sm-2 rounded">
      <NavBarUnregistered />
      <div className = " border border-dark border-2 bg-warning w-50 mx-sm-auto my-5 border-rounded p-3">
        <h2>Products available from {userName}:</h2>
        { products.length > 0 ? products.map((product, idx) =>
          <p className = "text-success" key = {idx}>
            <Link to = {'/' + userName + '/' + product._id}>
              { product.title }
            </Link>
          </p>
        ): <p className = "text-danger bg-light w-50 mx-sm-auto">{userName} has no products on display</p>}
        <p className = "bg-light"><Link className = "text-dark mx-sm-2" to = { '/' }> Back to all sellers </Link></p>
        <p><button className = "btn btn-outline-primary" onClick = {sellNow}>Become a seller</button></p>
      </div>
    </div>
  );
};

export default ShowDetail;