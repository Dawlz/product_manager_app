import React, { useState } from 'react';
import axios from "axios";
import { Link, navigate } from '@reach/router';
import NavBarUnregistered from './navBarUnregistered';

const LogIn = (props) => {

    const [ email, setEmail ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');



    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/signup',
            {
                email,
                userName,
                password,
                confirmPassword
            }
         , { withCredentials: true })
            .then(res => 
               {
                console.log(res)
                if (res.status === 201) {
                    const userId = res.data.user._id;
                    navigate('/home/' + userId);
                }})
            .catch(err => {
                console.log(err)
                // const errorResponse = err.response.data.errors;
                // const errorArr = [];
                // for (const key of Object.keys(errorResponse)) {
                //     errorArr.push(errorResponse[key].message)
                // }
                // setError(errorArr);
            });
    }
    

    return(
        <div>
            < NavBarUnregistered />
            <div className = "row col-md-8 my-sm-5 mx-md-auto p-sm-3">
                <div className = "border border-sm-2 border-light bg-light m-2 mx-auto w-75">
                    <h1 className ="fs-3">Welcome to your product manager</h1>
                    <h3 className = "fs-5">Please sign up to get started</h3>
                    <h6>Or click <Link to = {"/"}>Here</Link> to view as a guest</h6>
                </div>
                <div className = "border border-sm-2 border-light w-75 bg-secondary p-sm-2 mx-auto mt-2">
                    <form className = "border mt-3 gap-2 border-sm-2 bg-light shadow-lg rounded border-success w-md-50 pb-3 mx-auto" onSubmit= { submitHandler }>  
                        {/* { error.map((error, i) =>
                            <p key= {i} >{ error }</p>
                        )} */}
                        <h3 className = "mx-sm-auto my-sm-4">Sign Up</h3>
                        <p className = "form-floating">
                            <input className = "form-control" type="email" placeholder= "Enter a valid email address" name = "email" value = { email } onChange = {e => setEmail(e.target.value)} />
                            <label className = "form-label" htmlFor="email"> Email: </label>
                        </p>
                        <p className = "form-floating">
                            <input className = "form-control" type="text" placeholder= "Enter your username" name = "userName" value = { userName } onChange = {e => setUserName(e.target.value)} />
                            <label className = "form-label" htmlFor="userName"> Username: </label>
                        </p>
                        <p className = "form-floating">
                            <input className = "form-control" type="password" placeholder="Password" name = "password" value = { password } onChange = {e => setPassword(e.target.value)}/>
                            <label className = "form-label" htmlFor="password"> Password: </label>
                        </p>
                        <p className = "form-floating">
                            <input className = "form-control" type="password" placeholder="Confirm Password" name = "confirmPassword" value = { confirmPassword } onChange = {e => setConfirmPassword(e.target.value)}/>
                            <label className = "form-label" htmlFor="confirmPassword"> Re-enter Password: </label>
                        </p>
                        <input className = "btn btn-success" type="submit"/>
                    </form>
                        <p>Already a user? <Link to = {'/login'} > Login </Link></p>
                </div>
            </div>
        </div>
    )
}

export default LogIn