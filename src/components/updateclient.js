import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateClient() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setName(localStorage.getItem(' Name'));
        setContact(localStorage.getItem('Contact'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:8080/client/${id}`, {
            name: name,
            contact: contact,
            
        }).then(() => {
            navigate('/read'); // использование navigate для перехода на другую страницу
        }).catch(error => {
            console.error('Ошибка при обновлении данных:', error);
        });
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Contact' value={contact} onChange={(e) => setContact(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
