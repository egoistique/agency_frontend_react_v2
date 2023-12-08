import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../../forms.css'; // Подключаем файл стилей

export default function CreateClient() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const postData = () => {
        axios.post('http://localhost:8081/agent/', {
            name,
            contact,
        }).then(() =>{
            navigate('/readagents'); 
        })
    }
    return (
        <div className="create-container">
            <h2 className="title">New agent</h2>
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
