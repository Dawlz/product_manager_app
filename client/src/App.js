import React from 'react';
import { Router } from "@reach/router";
import './App.css';
import ShowDetail from './components/showUserProducts';
import EditProduct from './components/editProduct';
import LogIn from './components/login';
import NewProductForm from './components/theForm';
import MyProduct from './components/userProducts';
import AllUsers from './components/showUsers';
import SignUp from './components/signUp';
import ProductDetail from './components/productDetail';

function App() {

  return (
      <div className="App">
        <Router>
          <AllUsers path = "/" />
          <LogIn path = '/login' />
          <SignUp path = '/signup' />
          <NewProductForm path = "/home/:uid" />
          <ShowDetail path = '/:userName' />
          <EditProduct path = '/edit/:id/:uid' />
          <ProductDetail path = '/:userName/:id' />
          <MyProduct path = '/myproduct/:uid' />
        </Router>
      </div>
  );
}

export default App;

