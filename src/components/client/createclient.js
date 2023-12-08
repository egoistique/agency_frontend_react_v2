import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import '../../forms.css';

export default function CreateClient() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const postData = () => {
        axios.post('http://localhost:8081/client/', {
            name,
            contact,
        }).then(() =>{
            navigate('/readclients'); 
        })
    }
    return (
        <div>
            <h2 className="title">New client</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Contact</label>
                    <input placeholder='Contact' onChange={(e) => setContact(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}