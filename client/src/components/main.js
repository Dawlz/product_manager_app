import React, { useState } from 'react';
import axios from 'axios';

const Main = props => {
    const [ message, setMessage] = useState('Loading...');
        axios.get('http://localhost:8000/api')
            .then(res => setMessage(res.data.message))


    return(
        <div>
            <p>{ message }</p>
        </div>
    )


}


export default Main;
