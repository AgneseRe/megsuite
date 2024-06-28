import React from 'react';
import { Container, Image, Col, Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
function UserList(props) {
    return (
        <Container className='mt-2 overflow-hidden'>
            <Row lg={4} className='g-4'>
                {props.guests.map((guest) => (
                    <Col key={guest.userID}>
                        <Utente guest={guest} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

function Utente(props) {
    return (
        <Card className='border rounded me-3 bg-light'>
            <Card.Body className='d-flex align-items-center'>
                <Image width={100} src="profilo.png" className='me-3' roundedCircle />
                <div>
                    <Card.Title className='mb-2'>{props.guest.username}</Card.Title>
                    <Link to='/live-chat' className='btn btn-outline-primary me-3'>
                        <img src='Chat.png' height={'30px'} alt="Chat" />
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default UserList;
