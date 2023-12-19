import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ReadReports() {
    const [APIData, setAPIData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = () => {
        axios.get(`http://localhost:8081/report/reports/search?searchTerm=${searchTerm}&page=${currentPage - 1}&size=${itemsPerPage}`)
            .then((response) => {
                setAPIData(response.data.content);
                setTotalPages(response.data.totalPages);
            })
    };

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem('text', data.text);
        localStorage.setItem('agent_id', data.agent_id ? data.agent_id.id : '');
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8081/report/${id}`)
            .then(() => {
                fetchData();
            })
    }

    const renderPageData = () => {
        return APIData.map((data) => (
            <div key={data.id} className="card">
                <Card>
                    <Card.Content>
                        <Card.Header>{data.text}</Card.Header>
                        <Card.Meta>
                            {`Agent: ${data.agent_id ? data.agent_id.name : 'N/A'}`}<br />
                            {`Contact: ${data.agent_id ? data.agent_id.contact : 'N/A'}`}
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='card-buttons'>
                            <Link to='/updatereport'>
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
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
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
                {renderPageData()}
            </div>
            <div className="pagination-info">
                Page: {currentPage} / {totalPages}
                <br />
                On page: {APIData.length}
            </div>

            <div className="switcher-pages">
                <Button className="switcher-button" onClick={prevPage} disabled={currentPage === 1}>Back</Button>
                <Button className="switcher-button" onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </div>
    );
}
