import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import '../../forms.css';
import { sanitizeSQL, sanitizeHTML, escapeData } from '../sanitization';

export default function CreateReport() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [agent_id, setAgent] = useState('');
    const [agents, setAgents] = useState([]);
    const [errors, setErrors] = useState({
        text: false,
        agent: false,
    });

    useEffect(() => {
        axios.get('http://localhost:8081/agent/')
            .then((response) => {
                setAgents(response.data);
            })
            .catch((error) => {
                console.error('Error fetching agents:', error);
            });
    }, []);

    const postData = () => {
        if (!text) {
            setErrors(prevErrors => ({ ...prevErrors, text: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, text: false }));
        }

        if (!agent_id) {
            setErrors(prevErrors => ({ ...prevErrors, agent: true }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, agent: false }));
        }

        if (text && agent_id) {
            const sanitizedText = sanitizeHTML(escapeData(sanitizeSQL(text)));
            const newReport = {
                text: sanitizedText,
                agent_id: agents.find((a) => a.id === parseInt(agent_id)),
            };

            axios.post('http://localhost:8081/report/', newReport)
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
    };

    return (
        <div>
            <h2 className="title">New report</h2>
            <Form className="create-form">
                <Form.Field error={errors.text}>
                    <label>Text</label>
                    <input placeholder='Text' value={text} onChange={(e) => setText(e.target.value)} />
                    {errors.text && <p className="error-message">Text should not be empty</p>}
                </Form.Field>
                <Form.Field error={errors.agent}>
                    <label>Agent</label>
                    <select value={agent_id} onChange={(e) => setAgent(e.target.value)}>
                        <option value="">Select an agent</option>
                        {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>{agent.name}</option>
                        ))}
                    </select>
                    {errors.agent && <p className="error-message">Please select an agent</p>}
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
