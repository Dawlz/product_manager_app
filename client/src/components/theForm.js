import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Main from './main';
import NavBarRegistered from './navBarRegistered';

const NewProductForm = (props) => {

  
  const [ title, setTitle ] = useState('');
  const [ price, setPrice ] = useState(0);
  const [ quantity, setQuantity ] = useState(0);
  const [ description, setDescription ] = useState('');
  
  useEffect(() => {
    const cookies = new Cookies()
    if (!cookies.get('userToken')) {
      navigate('/login')
    }

  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:8000/api/new/${props.uid}`, {
      title,
      price,
      quantity,
      description
    }, {withCredentials:true})
      .then(res => {
        console.log(res.data.products);})
      .catch(err => {console.log(err); navigate('/login')})
    setTitle('');
    setPrice(0);
    setQuantity(0);
    setDescription('');
};
return(
  <div>
    <NavBarRegistered />
    <Main />
    <div className = "row col-md-8 my-sm-5 mx-md-auto">
      <div className = "border border-sm-2 border-light bg-light m-2 mx-auto w-75">
        <h1 className ="fs-3">Add a new product Product</h1>
      </div>
      <div className = "border border-sm-2 border-light w-75 bg-secondary p-sm-2 mx-auto mt-2">
        <form className = "border mt-3 gap-2 border-sm-2 bg-light shadow-lg rounded border-success w-md-50 p-3 px-3 mx-auto" onSubmit= { submitHandler }>
          <p className = "input-group w-5">
            <label className = "input-group-text" htmlFor="title"> Title: </label> <br />
            <input className = "w-md-25 form-control" type="text" name = "title" value = { title } onChange = { e => setTitle(e.target.value) } />
          </p>
          <p className = "input-group w-5">
            <label className = "input-group-text"  htmlFor="price"> Price: </label> <br />
            <input className = "w-md-25 form-control me-2" type="number" name = "price" value = { price } onChange = {e => setPrice(e.target.value)}/>
            <label className = "input-group-text ms-3" htmlFor="quantity"> Quantity: </label> <br />
            <input className = "w-md-25 form-control" type="number" name = "quantity" value = { quantity } onChange = {e => setQuantity(e.target.value)}/>
          </p>
          <p>
            <label className = "form-label" htmlFor="description"> Description: </label> <br />
            <textarea className = "form-control"
              rows="4"
              cols="50"
              placeholder="Describe the product here"
              onChange = {e => setDescription(e.target.value)}
              name = "description"
              value = { description }>
            </textarea>
          </p>
          <input className = "btn btn-outline-success btn-sm" type="submit"/>
          <p> <Link to = {"/myproduct/" + props.uid}> Show My Products </Link></p>
        </form>
    </div>
  </div>
  </div>
  )
};

export default NewProductForm;