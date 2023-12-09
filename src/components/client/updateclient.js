import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../forms.css';
import { sanitizeSQL, sanitizeHTML, escapeData } from '../sanitization';

export default function UpdateClient() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({
        name: false,
        contact: false,
    });

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setName(localStorage.getItem('name'));
        setContact(localStorage.getItem('contact'));
    }, []);

    const updateAPIData = () => {
        if (!name) {
            setErrors(prevErrors => ({ ...prevErrors, name: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, name: false }));
        }

        if (!contact) {
            setErrors(prevErrors => ({ ...prevErrors, contact: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, contact: false }));
        }

        if (name && contact) {
            const sanitizedName = sanitizeHTML(escapeData(sanitizeSQL(name)));
            const sanitizedContact = sanitizeHTML(escapeData(sanitizeSQL(contact)));
            axios.put(`http://localhost:8081/client/${id}`, {
                name: sanitizedName,
                contact: sanitizedContact,
                
            }).then(() => {
                navigate('/readclients'); 
            }).catch(error => {
                console.error('Ошибка при обновлении данных:', error);
            });
        }
    }

    return (
        <div>
            <h2 className="title">Update client</h2>
            <Form className="create-form">
                <Form.Field error={errors.name}>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="error-message">Name should not be empty</p>}
                </Form.Field>
                <Form.Field error={errors.contact}>
                    <label>Contact</label>
                    <input placeholder='Contact' value={contact} onChange={(e) => setContact(e.target.value)} />
                    {errors.contact && <p className="error-message">Contact should not be empty</p>}
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}