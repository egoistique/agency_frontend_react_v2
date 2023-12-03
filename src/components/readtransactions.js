import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ReadTranscations() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/transaction/')
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem(' type', data.type);
        localStorage.setItem('agent_id', data.agent_id);
        localStorage.setItem('seller_id', data.seller_id);
        localStorage.setItem('buyer_id', data.buyer_id);
        localStorage.setItem('estate_object_id', data.estate_object_id);
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/transaction/${id}`)
        .then(() => {
            const updatedData = APIData.filter(item => item.id !== id);
            setAPIData(updatedData);
        })
    }

    return (
        <div className="read-container">        
            <div className="card-container">
                {APIData.map((data) => (
                    <div key={data.id} className="card"> {/* Добавление класса card здесь */}
                        <Card>
                            <Card.Content>
                                <Card.Header>{`Type: ${data.type}`}</Card.Header>
                                <Card.Meta>
                                    {`Agent: ${data.agent_id ? data.agent_id.name : 'N/A'}`}<br />
                                    {`Contact: ${data.agent_id ? data.agent_id.contact : 'N/A'}`}<br /><br />
                                </Card.Meta>
                                <Card.Meta>
                                    {`Seller: ${data.seller_id ? data.seller_id.name : 'N/A'}`}<br />
                                    {`Contact: ${data.seller_id ? data.seller_id.contact : 'N/A'}`}<br /><br />
                                </Card.Meta>
                                <Card.Meta>
                                    {`Buyer: ${data.buyer_id ? data.buyer_id.name : 'N/A'}`}<br />
                                    {`Contact: ${data.buyer_id ? data.buyer_id.contact : 'N/A'}`}<br /><br />
                                </Card.Meta>
                                <Card.Meta>
                                    {`Location: ${data.estate_object_id ? data.estate_object_id.location : 'N/A'}`}<br />
                                    {`Price: ${data.estate_object_id ? data.estate_object_id.price : 'N/A'}`}
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='card-buttons'>
                                    <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}
