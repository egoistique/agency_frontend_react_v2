import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
export default function Read() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/client/')
            .then((response) => {
                console.log(response.data)
                setAPIData(response.data);
            })
    }, []);

    const setData = (data) => {
        let { id, name, contact} = data;
        localStorage.setItem('ID', id);
        localStorage.setItem(' Name', name);
        localStorage.setItem('Contact', contact);
    }

    const getData = () => {
        axios.get('http://localhost:8080/client/')
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/client/${id}`)
        .then(() => {
            getData();
        })
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Contact</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.contact}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}