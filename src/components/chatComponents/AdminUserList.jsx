import React, { useState } from 'react';
import { Container, Image, Col, Row, Button, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminUserList(props) {
    const [users, setUsers] = useState(props.users);

    // Funzione per gestire l'eliminazione di un utente
    const handleDelete = (userID) => {
        // Rimuovi l'utente dallo stato locale
        const updatedUsers = users.filter(user => user.userID !== userID);
        setUsers(updatedUsers);

        // Chiama la callback onDelete per eliminare l'utente dal database
        if (props.onDelete) {
            props.onDelete(userID);
        }
    };

    // Funzione per gestire la modifica del ruolo di un utente
    const handleEdit = (userID, role) => {
        // Chiama la callback onEdit per modificare l'utente nel database
        if (props.onEdit) {
            props.onEdit(userID, role);
        }

        // Aggiorna il ruolo dell'utente nello stato locale
        const updatedUsers = users.map(user => {
            if (user.userID === userID) {
                return { ...user, role };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    // Se non ci sono utenti o l'array è vuoto, mostra un messaggio di nessun utente trovato
    if (!users || users.length === 0) {
        return (
            <Container className='mt-2 overflow-hidden'>
                <p>Nessun utente trovato!</p>
            </Container>
        );
    }

    // Renderizza la lista degli utenti
    return (
        <Container className='mt-2 overflow-hidden'>
            <Row lg={4} className='g-4'>
                {users.map((user) => (
                    <Col key={user.userID}>
                        <Utente user={user} onDelete={handleDelete} onEdit={handleEdit} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

function Utente(props) {
    const [showDropdown, setShowDropdown] = useState(false);

    // Funzione per gestire l'eliminazione di un utente
    const handleDelete = () => {
        console.log('Elimina utente con ID:', props.user.userID);
        if (props.onDelete) {
            props.onDelete(props.user.userID);
        }
    };

    // Funzione per gestire la modifica del ruolo di un utente
    const handleEdit = (role) => {
        console.log('Modifica utente con ID:', props.user.userID, 'Ruolo:', role);
        if (props.onEdit) {
            props.onEdit(props.user.userID, role);
        }
        setShowDropdown(false);
    };

    // Renderizza il componente di visualizzazione dell'utente
    return (
        <Card className='border rounded me-3 bg-light'>
            <Card.Body className='d-flex align-items-center'>
                <Image width={100} src="profilo.png" className='me-3' roundedCircle />
                <div>
                    <Card.Title className='mb-2'>
                        {props.user.username} <small className='text-muted'>({props.user.role || 'guest'})</small>
                    </Card.Title>
                    <Link to='/live-chat' className='btn btn-outline-primary me-3'>
                        <img src='Chat.png' height={'30px'} alt="Chat" />
                    </Link>
                    <Button className='bg-white' onClick={handleDelete}>
                        <img src='Elimina.png' height={'30px'} alt="Elimina" />
                    </Button>
                    <Button className='bg-white' onClick={() => setShowDropdown(!showDropdown)}>
                        <img src='Modifica.png' height={'30px'} alt="Modifica" />
                    </Button>
                    {showDropdown && (
                        <Dropdown.Menu show className='position-absolute'>
                            <Dropdown.Item onClick={() => handleEdit('funzionario')}>Funzionario</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEdit('manager')}>Manager</Dropdown.Item>
                        </Dropdown.Menu>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default AdminUserList;
