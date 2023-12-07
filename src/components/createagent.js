import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

export default function CreateAgent() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const postData = () => {
        axios.post('http://localhost:8081/agent/', {
            name,
            contact,
        }).then(() =>{
            navigate('/readagents'); 
        })
    }
    return (
        <div>
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