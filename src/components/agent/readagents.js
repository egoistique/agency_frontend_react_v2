import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ReadAgents() {
    const [APIData, setAPIData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]); 

    const fetchData = () => {
        axios.get(`http://localhost:8081/agent/agents/search?searchTerm=${searchTerm}&page=${currentPage}&size=20`)
            .then((response) => {
                setAPIData(response.data.content);
                setTotalPages(response.data.totalPages);
            })
    };

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem('Name', data.name); 
        localStorage.setItem('Contact', data.contact);
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8081/agent/${id}`)
            .then(() => {
                fetchData();
            })
    }

    const renderAgents = () => {
        return APIData.map((data) => (
            <div key={data.id} className="card">
                <Card>
                    <Card.Content>
                        <Card.Header>{data.name}</Card.Header>
                        <Card.Meta>{data.contact}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='card-buttons'>
                            <Link to='/updateagent'>
                                <Button onClick={() => setData(data)}>Update</Button>
                            </Link>
                            <Button onClick={() => onDelete(data.id)}>Delete</Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        ));
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="read-container">
            <Input
                className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="card-container">
                {renderAgents()}
            </div>
            <div className="pagination-info">
                Page: {currentPage + 1} / {totalPages}
                <br />
                On page: {APIData.length}
            </div>

            <div className="switcher-pages">
                <Button className="switcher-button" onClick={prevPage} disabled={currentPage === 0}>Back</Button>
                <Button className="switcher-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</Button>
            </div>
        </div>
    );
}
