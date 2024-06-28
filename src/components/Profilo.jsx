import React from 'react';
import { Container, Image, Col, Row, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function Profilo(props) {
    const { user } = props;

    return (
        <Container className='d-flex justify-content-center'>
            <Row className='mt-5 align-items-center'>
                <Col className='border rounded me-3 bg-light'>
                    <Container className='mb-3 mt-4 d-flex flex-column align-items-end position-relative'>
                        <Button onClick={CaricaFile} className='position-absolute rounded-circle'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor">
                                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0" />
                            </svg>
                        </Button>
                        <Image width={100} src="profilo.png" roundedCircle />
                    </Container>
                    <Container className='mb-4 d-flex flex-column align-items-end'>
                        <h5 className='mb-3'>{user.username}</h5>
                        <Button className='bg-primary' onClick={props.logout}>Log Out</Button>
                    </Container>
                </Col>
                <Col className='pt-5 pb-5 ms-5 border rounded bg-light'>
                    <Card style={{ width: '25rem', height: '10rem' }} className='pt-2 ps-4 pe-2 pb-2 d-flex justify-content-center border-0 bg-light'>
                        <Row>
                            <Col className='text-muted fw-bold'>Nome Completo</Col>
                            <Col>{user.nome} {user.cognome}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='text-muted fw-bold'>Username</Col>
                            <Col>{user.username}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='text-muted fw-bold'>Email</Col>
                            <Col>{user.email}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='text-muted fw-bold'>Ruolo</Col>
                            <Col>{user.ruolo}</Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

const CaricaFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
        const file = input.files[0];
        if (file) {
            alert("Il nome del file è: " + file.name);
        }
    };
    input.click();
};

export default Profilo;
