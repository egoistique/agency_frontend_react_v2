import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ReadAgents() {
    const [APIData, setAPIData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0); // Начинаем с 0, т.к. в Pageable начальная страница тоже считается с 0
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        axios.get(`http://localhost:8081/agent/agents?page=${currentPage}&size=20`)
            .then((response) => {
                setAPIData(response.data.content); // content содержит массив данных на текущей странице
                setTotalPages(response.data.totalPages); // totalPages содержит общее количество страниц
            })
    };

    const setData = (data) => {
        localStorage.setItem('ID', data.id);
        localStorage.setItem(' Name', data.name);
        localStorage.setItem('Contact', data.contact);
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8081/agent/${id}`)
            .then(() => {
                fetchData(); // После удаления данных, перезапрашиваем текущую страницу
            })
    }

    const filterAgents = () => {
        return APIData.filter(data =>
            data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const renderAgents = () => {
        return filterAgents().map((data) => (
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
                Page: {currentPage + 1} / {totalPages} {/* Текущая страница и общее количество страниц */}
                <br />
                On page: {filterAgents().length}  {/* Количество агентов на текущей странице */}
            </div>

            <div className="switcher-pages">
                <Button className="switcher-button" onClick={prevPage} disabled={currentPage === 0}>Back</Button>
                <Button className="switcher-button" onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</Button>
            </div>
        </div>
    );
}
