import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie'
import axios from "axios";
import { Link, navigate } from '@reach/router';
import NavBarRegistered from './navBarRegistered';

const EditProduct = (props) => {

  
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ quantity, setQuantity ] = useState('')
  const [ description, setDescription ] = useState('');
  const [ productName, setProductName ] = useState('')
  
  useEffect(() => {
    const cookies = new Cookies()
    if (!cookies.get('userToken')) {
      navigate('/login')
    }
    
    axios.get('http://localhost:8000/api/' + props.id + '/' + props.uid, { withCredentials: true })
      .then(res => {
        setProductName(res.data.title);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setQuantity(res.data.quantity);
        setDescription(res.data.description)
      })
  }, [props]);

  const submitHandler = () => {
    axios.put('http://localhost:8000/api/' + props.id + '/' + props.uid, {
      title,
      price,
      quantity,
      description
    }, { withCredentials: true })
      .then(res => console.log(res.data));
    alert('Your changes have been saved, click done when done')
  };


  return(
    <div>
      <NavBarRegistered />
      <div className = "row col-md-8 my-sm-5 mx-md-auto">
        <div className = "border border-sm-2 border-light bg-light m-2 mx-auto w-75">
          <h1 className ="fs-3">Edit Your Product</h1>
          <h3 className = "fs-5">Currently Editing : { productName }</h3>
        </div>
        <div className = "border border-sm-2 border-light w-75 bg-secondary p-sm-2 mx-auto mt-2">
          <form className = "border mt-3 gap-2 border-sm-2 bg-light shadow-lg rounded border-success w-md-50 p-3 mx-auto" onSubmit= { submitHandler }>
            <p className = "input-group w-5">
              <label className = "input-group-text" htmlFor="title"> Title: </label> <br />
              <input className = "w-sm-25 form-control" type="text" defaultValue = { title } onChange = {e => { setTitle(e.target.value)} } />
            </p>
            <p className = "input-group w-5">
              <label className = "input-group-text" htmlFor="price"> Price: </label>
              <input className = "w-sm-25 form-control me-2" type="number" defaultValue = { price } onChange = {e => setPrice(e.target.value)}/>
              <label className = "input-group-text ms-3" htmlFor="quantity"> Quantity: </label>
              <input className = "w-sm-25 form-control" type="number" defaultValue = { quantity } onChange = {e => setQuantity(e.target.value)}/>
            </p>
            <p>
              <label className = "form-label" htmlFor="description"> Description: </label> <br />
              <textarea className = "form-control"
                rows="4"
                cols="50"
                placeholder="Describe the product here"
                onChange = {e => setDescription(e.target.value)}
                defaultValue = { description }>
              </textarea>
            </p>
              <input className = "btn btn-outline-success btn-sm" type="submit"/>
            <p>
              <Link to = { '/myproduct/' + props.uid }>Done</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
};

export default EditProduct;