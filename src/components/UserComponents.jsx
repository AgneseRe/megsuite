import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import API from "../../API.mjs";

function UserComponents() {  

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getUsers = async () => {
            const users = await API.getUsers();
            setUsers(users);
        }
        getUsers();
    }, []);

    
    const deleteUser = (userId) => {
        setUsers(oldUsers => {
            return oldUsers.map((user) => {
                if(user.idUser !== userId)
                    return user;
            })
        })       
    }

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Tutti gli utenti registrati</h2>

            <Table striped bordered>
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Ruolo</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, index) => (
                        <tr key={u.idUser} className={index % 2 === 0 ? 'row-color-1' : 'row-color-2'}>
                            <td>{u.idUser}</td>
                            <td>{u.username}</td>
                            <td>{u.nome}</td>
                            <td>{u.cognome}</td>
                            <td>{u.ruolo}</td>
                            <td>{u.email}</td>
                            <td>{u.telefono}</td>
                            <td>
                                <Button variant="warning">Edit</Button>
                                <Button variant="danger" onClick={() => deleteUser(u.idUser)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default UserComponents;
