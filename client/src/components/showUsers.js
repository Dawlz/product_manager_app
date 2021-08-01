import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from "@reach/router";
import NavBarUnregistered from './navBarUnregistered';

const AllUsers = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8000/api/users')
            .then(res => setUsers(res.data))
    }, []);

    const signMeUp = () => {
        navigate('/signup')
    };

    return(
        <div>
            <NavBarUnregistered />
            <div className = "border border-dark border-2 w-50 my-5 bg-warning mx-auto">
                <h2 className = "text-white">Welcome to Managerize</h2>
                <h3>Click on any seller to view and buy a product from them</h3>
                { users.map((user, id) =>
                <p key = {id}>
                    <Link to = { '/' + user.userName }> {user.userName} </Link>
                </p>
                )}
                <button className = "btn btn-outline-secondary m-3" onClick = { signMeUp }>Sign Up Here</button>
            </div>
        </div>
    );
};

export default AllUsers;

