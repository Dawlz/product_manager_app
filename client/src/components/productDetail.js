import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import NavBarUnregistered from './navBarUnregistered';

const ProductDetail = (props) => {

    const [productdetail, setProductDetail] = useState('');

    const backToUserProducts = (e) => {
      e.preventDefault();
      navigate('/' + props.userName)
    }

    useEffect(() => {
      axios.get('http://localhost:8000/api/product/' + props.userName + '/' + props.id)
        .then(res => {
          setProductDetail(res.data)
        })
    }, [props])

    return(
      <div>
        < NavBarUnregistered />
        <div className = "border border-secondary border-sm-2 mx-sm-auto p-sm-3 my-5 col-sm-6 bg-light">
          <h2 className = "w-50 bg-dark mx-sm-auto text-white-50"> { productdetail.title } </h2>
          <div className = "w-50 bg-warning mx-sm-auto border border-info border-sm-1">
            <p className = "text-info">Available at ${productdetail.price}</p>
            <p className = "text-info">Details: {productdetail.description} </p>
            <p className = "text-info"> {productdetail.quantity} left in stock </p>
          </div>
          <button className = "btn btn-outline-dark my-sm-2" onClick = { backToUserProducts } >Back to products</button>
        </div>
      </div>
    )
}

export default ProductDetail;