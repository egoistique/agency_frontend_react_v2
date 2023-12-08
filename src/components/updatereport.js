import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateReport() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [text, setText] = useState('');
    const [agent_id, setAgent] = useState('');
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setText(localStorage.getItem('text'));
        setAgent(localStorage.getItem('agent_id'));

        axios.get('http://localhost:8081/agent/')
            .then((response) => {
                setAgents(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching agents:', error);
            });
    }, []);

    const updateAPIData = () => {
        const newReport = {
            text: text,
            agent_id: agents.find((a) => a.id === parseInt(agent_id))
        };

        axios.put(`http://localhost:8081/report/${id}`, newReport)
        .then(() => {
            axios.get('http://localhost:8081/agent/')
                .then((response) => {
                    setAgents(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching agents:', error);
                });
            setText(''); 
            setAgent('');
            navigate('/readreports'); 
        })
        .catch((error) => {
            console.error('Error creating report:', error);
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
                    <label>Agent</label>
                    <select value={agent_id} onChange={(e) => setAgent(e.target.value)}>
                        <option value="">Select an agent</option>
                        {agents.map((agent_id) => (
                            <option key={agent_id.id} value={agent_id.id}>{agent_id.name}</option>
                        ))}
                    </select>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
