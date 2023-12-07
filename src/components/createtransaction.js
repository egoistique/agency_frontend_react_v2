import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

export default function CreateTransaction() {
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [agent_id, setAgent] = useState('');
    const [seller_id, setSeller] = useState('');
    const [buyer_id, setBuyer] = useState('');
    const [estate_object_id, setEstateObject] = useState('');

    const [agents, setAgents] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [objects, setEstateObjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/agent/')
            .then((response) => {
                setAgents(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching agents:', error);
            });

        axios.get('http://localhost:8081/client/')
            .then((response) => {
                setSellers(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching Sellers:', error);
            });
        axios.get('http://localhost:8081/client/')
            .then((response) => {
                setBuyers(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching Buyers:', error);
            });
        axios.get('http://localhost:8081/estate-object/')
            .then((response) => {
                setEstateObjects(response.data); 
            })
            .catch((error) => {
                console.error('Error fetching Objects:', error);
            });
    }, []);

    const postData = () => {
        axios.post('http://localhost:8081/transaction/', {
            type,
            agent_id: agents.find((a) => a.id === parseInt(agent_id)),
            seller_id: sellers.find((a) => a.id === parseInt(seller_id)),
            buyer_id: buyers.find((a) => a.id === parseInt(buyer_id)),
            estate_object_id: objects.find((a) => a.id === parseInt(estate_object_id))
        }).then(() => {
            navigate('/readtransactions'); 
        })
        .catch((error) => {
            console.error('Error creating transaction:', error);
        });
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Type</label>
                    <input placeholder='Type' value={type} onChange={(e) => setType(e.target.value)}/>
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
                <Form.Field>
                    <label>Seller</label>
                    <select value={seller_id} onChange={(e) => setSeller(e.target.value)}>
                        <option value="">Select an seller</option>
                        {sellers.map((seller_id) => (
                            <option key={seller_id.id} value={seller_id.id}>{seller_id.name}</option>
                        ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Buyer</label>
                    <select value={buyer_id} onChange={(e) => setBuyer(e.target.value)}>
                        <option value="">Select an buyer</option>
                        {buyers.map((buyer_id) => (
                            <option key={buyer_id.id} value={buyer_id.id}>{buyer_id.name}</option>
                        ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Estate object</label>
                    <select value={estate_object_id} onChange={(e) => setEstateObject(e.target.value)}>
                        <option value="">Select an estate object</option>
                        {objects.map((estate_object_id) => (
                            <option key={estate_object_id.id} value={estate_object_id.id}>{estate_object_id.location}</option>
                        ))}
                    </select>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}