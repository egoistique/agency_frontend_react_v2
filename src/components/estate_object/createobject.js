import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

export default function CreateObject() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const postData = () => {
        axios.post('http://localhost:8081/estate-object/', {
            location,
            price,
        }).then(() =>{
            navigate('/readobjects'); 
        })
    }
    return (
        <div>
            <h2 className="title">New estate object</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Location</label>
                    <input placeholder='Location' onChange={(e) => setLocation(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' onChange={(e) => setPrice(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}