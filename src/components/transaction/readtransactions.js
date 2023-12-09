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
    const [currentPageItemCount, setCurrentPageItemCount] = useState(itemsPerPage);

    useEffect(() => {
        axios.get('http://localhost:8081/transaction/')
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    useEffect(() => {
        const filteredData = filterTransactions();
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        setCurrentPageItemCount(
            currentPage === totalPages ? filteredData.length - startIndex : itemsPerPage
        );

        setCurrentPageData(filteredData.slice(startIndex, endIndex));
    }, [searchTerm, APIData, currentPage, itemsPerPage]);


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
            const updatedData = APIData.filter(item => item.id !== id);
            setAPIData(updatedData);
        })
    }

    const filterTransactions = () => {
        return APIData.filter(data =>
            data.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.agent_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.agent_id.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.seller_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.seller_id.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.buyer_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.buyer_id.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.estate_object_id.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.estate_object_id.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const renderPageData = () => {
        return currentPageData.map((data) => (
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
        const totalPages = Math.ceil(filterTransactions().length / itemsPerPage);
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
                Found: {filterTransactions().length}
                <br />
                On page: {currentPageItemCount}
            </div>
            <div className="switcher-pages">
                <Button className="switcher-button" onClick={prevPage}>Back</Button>
                <Button className="switcher-button" onClick={nextPage}>Next</Button>
            </div>
        </div>
    );
    
    
}
