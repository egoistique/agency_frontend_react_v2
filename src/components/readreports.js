import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ReadReports() {
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/report/')
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem(' Text', data.text);
        localStorage.setItem('Agent_id', data.agent_id);
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/report/${id}`)
        .then(() => {
            const updatedData = APIData.filter(item => item.id !== id);
            setAPIData(updatedData);
        })
    }

    return (
        <div className="read-container">
            <h2>Reports</h2>
            <div className="card-container">
                {APIData.map((data) => (
                    <div key={data.id} className="card"> {/* Добавление класса card здесь */}
                        <Card>
                            <Card.Content>
                                <Card.Header>{data.text}</Card.Header>
                                <Card.Meta>{data.agent_id}</Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='card-buttons'>
                                    {/* <Link to='/update'>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Link> */}
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
