import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import { sanitizeSQL, sanitizeHTML, escapeData } from '../sanitization';

export default function CreateObject() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({
        location: false,
        price: false,
    });
    
    const postData = () => {
        if (!location) {
            setErrors(prevErrors => ({ ...prevErrors, location: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, location: false }));
        }

        if (!price) {
            setErrors(prevErrors => ({ ...prevErrors, price: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, price: false }));
        }

        if (location && price) {
            const sanitizedLocation = sanitizeHTML(escapeData(sanitizeSQL(location)));
            const sanitizedPrice = sanitizeHTML(escapeData(sanitizeSQL(price)));

            axios.post('http://localhost:8081/estate-object/', {
                location: sanitizedLocation,
                price: sanitizedPrice,
            }).then(() =>{
                navigate('/readobjects'); 
            })
        }
    }
    return (
        <div>
            <h2 className="title">New estate object</h2>
            <Form className="create-form">
                <Form.Field error={errors.location}>
                    <label>Location</label>
                    <input placeholder='Location' onChange={(e) => setLocation(e.target.value)}/>
                    {errors.location && <p className="error-message">Location should not be empty</p>}
                </Form.Field>
                <Form.Field error={errors.price}>
                    <label>Price</label>
                    <input placeholder='Price' onChange={(e) => setPrice(e.target.value)}/>
                    {errors.price && <p className="error-message">Price should not be empty</p>}
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}