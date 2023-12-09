import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../forms.css';
import { sanitizeSQL, sanitizeHTML, escapeData } from '../sanitization';


export default function UpdateObject() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({
        location: false,
        price: false,
    });

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setLocation(localStorage.getItem('location'));
        setPrice(localStorage.getItem('price'));
    }, []);

    const updateAPIData = () => {
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

            axios.put(`http://localhost:8081/estate-object/${id}`, {
                location: sanitizedLocation,
                price: sanitizedPrice,            
            }).then(() => {
                navigate('/readobjects'); 
            }).catch(error => {
                console.error('Ошибка при обновлении данных:', error);
            });
        }
    }

    return (
        <div>
            <h2 className="title">Update estate object</h2>
            <Form className="create-form">
                <Form.Field error={errors.location}>
                    <label>Location</label>
                    <input placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                    {errors.location && <p className="error-message">Location should not be empty</p>}
                </Form.Field>
                <Form.Field error={errors.price}>
                    <label>Price</label>
                    <input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    {errors.price && <p className="error-message">Price should not be empty</p>}
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
