import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Contacts(props) {
    const [selectedUserID, setSelectedUserID] = useState(null); // Stato per tenere traccia dell'ID dell'utente selezionato

    const containerStyle = {
        height: '70vh',  // Altezza del container per mostrare solo 7 utenti alla volta
        overflowY: 'auto',  // Abilita lo scorrimento verticale
        position: 'relative'  // Posizione relativa necessaria per il position:absolute di Row
    };

    const handleUserClick = (guest) => {
        if (selectedUserID === guest.userID) {
            setSelectedUserID(null); // Deseleziona l'utente se è già selezionato
        } else {
            setSelectedUserID(guest.userID); // Seleziona l'utente cliccato
        }
        props.onUserClick(guest); // Passa l'oggetto guest a LiveChat per gestire l'attivazione della chat
    };

    return (
        <Container fluid className='mt-3 overflow-hidden'>
            <div
                data-mdb-scrollspy-init
                data-mdb-offset="0"
                style={containerStyle}
            >
                {props.guests.map((guest, index) => (
                    <React.Fragment key={guest.userID}>
                        <Container fluid className='d-flex flex-row mb-3' role='button' onClick={() => handleUserClick(guest)} style={{ cursor: 'pointer', backgroundColor: selectedUserID === guest.userID ? 'lightgray' : 'transparent' }}>
                            <Row style={{ color: 'rgb(84,154,219)' }} className='me-3 w-100'>
                                <Col xs={2} className='mt-3'>
                                    <Image width={50} src='profilo.png' roundedCircle />
                                </Col>
                                <Col xs={6}>
                                    <Row className='fw-bold'>{guest.username}</Row>
                                    <Row>Last message</Row>
                                </Col>
                                <Col xs={4} className='d-flex flex-column justify-content-end'>
                                    <Row className='justify-content-end'>12:03</Row>
                                    <Row className='justify-content-end'>
                                        <a href="#" className="text-body w-25">
                                            <i className="fas fa-envelope fa-2x"></i>
                                            <span className="badge rounded-pill badge-notification bg-primary text-light">{props.guests.length}</span>
                                        </a>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        {index !== props.guests.length - 1 && <hr style={{ marginTop: 0, marginBottom: 0, color: 'rgb(84,154,219)' }} className='border-2 opacity-100' />}
                    </React.Fragment>
                ))}
            </div>
        </Container>
    );
}

export default Contacts;
