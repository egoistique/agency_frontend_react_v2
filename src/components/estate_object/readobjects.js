import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'semantic-ui-react';  
import { Link } from 'react-router-dom';

export default function ReadObjects() {
    const [APIData, setAPIData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPageData, setCurrentPageData] = useState([]);
    const itemsPerPage = 20; 
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageItemCount, setCurrentPageItemCount] = useState(itemsPerPage);

    useEffect(() => {
        axios.get('http://localhost:8081/estate-object/')
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);

    useEffect(() => {
        const filteredData = filterObjects();
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
        localStorage.setItem('location', data.location);
        localStorage.setItem('price', data.price);
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8081/estate-object/${id}`)
        .then(() => {
            const updatedData = APIData.filter(item => item.id !== id);
            setAPIData(updatedData);
        })
    }

    const filterObjects = () => {
        return APIData.filter(data =>
            data.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    const renderPageData = () => {
        return currentPageData.map((data) => (
            <div key={data.id} className="card">
                <Card>
                    <Card.Content>
                        <Card.Header>{data.location}</Card.Header>
                        <Card.Meta>{data.price}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='card-buttons'>
                            <Link to='/updateobject'>
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
        const totalPages = Math.ceil(filterObjects().length / itemsPerPage);
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
                Found: {filterObjects().length}
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
