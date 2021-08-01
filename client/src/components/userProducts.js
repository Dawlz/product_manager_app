import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie'
import axios from 'axios';
import { Link, navigate } from "@reach/router";
import NavBarRegistered from "./navBarRegistered";

const MyProduct = (props) => {

  const [products, setProducts] = useState([]);

  const backToAddProduct = () => {
    navigate('/home/' + props.uid)
  }

  const editHandler = (productid) => {
    navigate("/edit/" + productid + "/" + props.uid);
  };

  const delProduct = (productId) => {
    axios.delete('http://localhost:8000/api/products/' + productId + '/' + props.uid, { withCredentials: true })
        .then(() => setProducts( products.filter( item => item._id !== productId ) ));
};

  useEffect(()=>{
    const cookies = new Cookies()
    if (!cookies.get('userToken')) {
      navigate('/login')
    }
    axios.get('http://localhost:8000/api/products/' + props.uid, {withCredentials: true})
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err))
  }, [props.uid])

  return(
    <div>
      <NavBarRegistered />
      <div className = "row border border-sm-2 border-sm-light col-md-8 p-sm-3 my-sm-5 mx-md-auto p-sm-auto">
        {products.length >= 1 ? products.map((product, idx) =>
          <h4 className = "border border-sm-4 border-sm-dark bg-sm-light" key = { idx } > { product.title }
            <button className = "btn btn-outline-primary btn-sm m-sm-2 p-1" onClick = {(e) => { editHandler(product._id) }} >Edit</button>
            <button className = "btn btn-outline-danger btn-sm m-sm-2 p-1" onClick = {(e) => { delProduct(product._id) }} >Delete</button>
          </h4>
        ) : <h5 className = "text-secondary bg-sm-dark">Whew! Empty as Space!! Click <Link to = {"/home/" + props.uid} >here</Link> to add your first product</h5> }
        <p className = "my-md-1">
          <button className = "btn btn-outline-info btn-sm" onClick = { backToAddProduct } >Add Product</button>
        </p>
      </div>
    </div>
  )
}

export default MyProduct;