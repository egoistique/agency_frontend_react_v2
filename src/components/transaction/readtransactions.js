import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'semantic-ui-react';  
import { Link } from 'react-router-dom';

export default function ReadTranscations() {
    const [APIData, setAPIData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPageData, setCurrentPageData] = useState([]);
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    const fetchData = () => {
        axios.get(`http://localhost:8081/transaction/transactions/search?searchTerm=${searchTerm}&page=${currentPage - 1}&size=${itemsPerPage}`)
            .then((response) => {
                setAPIData(response.data.content);
                setTotalPages(response.data.totalPages);
            })
    };

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem('type', data.type);
        localStorage.setItem('agent_id', data.agent_id ? data.agent_id.id : '');
        localStorage.setItem('seller_id', data.seller_id ? data.seller_id.id : '');
        localStorage.setItem('buyer_id', data.buyer_id ? data.buyer_id.id : '');
        localStorage.setItem('estate_object_id', data.estate_object_id ? data.estate_object_id.id : '');
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8081/transaction/${id}`)
        .then(() => {
            fetchData();
        })
    }

    const renderPageData = () => {
        return APIData.map((data) =>(
            <div key={data.id} className="card">
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
                            <Link to='/updatetransaction'>
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
                <Button className="switcher-button" onClick={prevPage}>Back</Button>
                <Button className="switcher-button" onClick={nextPage}>Next</Button>
            </div>
        </div>
    );
    
}
