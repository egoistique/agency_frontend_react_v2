import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateReport() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [text, setText] = useState('');
    const [agent_id, setAgentId] = useState('');
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setText(localStorage.getItem('text'));
        setAgentId(localStorage.getItem('agent_id'));

        axios.get('http://localhost:8081/agent/')
            .then((response) => {
                setAgents(response.data);
            })
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:8081/report/${id}`, {
            text: text,
            agent_id: agent_id, // Передаем agent_id
        }).then(() => {
            navigate('/readreports'); 
        }).catch(error => {
            console.error('Ошибка при обновлении данных:', error);
        });
    }
    
    
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Text</label>
                    <input placeholder='Text' value={text} onChange={(e) => setText(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Agent Id</label>
                    <select value={agent_id} onChange={(e) => setAgentId(e.target.value)}>
                        <option value="">Select an agent</option>
                        {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>{agent.name}</option>
                        ))}
                    </select>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
