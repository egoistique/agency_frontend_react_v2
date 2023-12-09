import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../../forms.css';
import { sanitizeSQL, sanitizeHTML, escapeData } from '../sanitization';

export default function CreateClient() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({
        name: false,
        contact: false,
    });

    const postData = () => {
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
        
            axios.post('http://localhost:8081/agent/', {
              name: sanitizedName,
              contact: sanitizedContact,
            }).then(() => {
              navigate('/readagents');
            });
        }
    };

    return (
        <div className="create-container">
            <h2 className="title">New agent</h2>
            <Form className="create-form">
                <Form.Field error={errors.name}>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="error-message">Name should not be empty</p>}
                </Form.Field>
                <Form.Field error={errors.contact}>
                    <label>Contact</label>
                    <input placeholder='Contact' onChange={(e) => setContact(e.target.value)} />
                    {errors.contact && <p className="error-message">Contact should not be empty</p>}
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
