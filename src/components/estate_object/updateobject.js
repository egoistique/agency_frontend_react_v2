import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateObject() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setLocation(localStorage.getItem('location'));
        setPrice(localStorage.getItem('price'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:8081/estate-object/${id}`, {
            location: location,
            price: price,
            
        }).then(() => {
            navigate('/readobjects'); 
        }).catch(error => {
            console.error('Ошибка при обновлении данных:', error);
        });
    }

    return (
        <div>
            <h2 className="title">Update estate object</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Location</label>
                    <input placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
