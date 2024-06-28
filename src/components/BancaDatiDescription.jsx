import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

function BancaDatiDescription() {
    return (
        <Container className="my-4">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Descrizione Generale</Accordion.Header>
                    <Accordion.Body>
                        Questo è un esempio di testo che descrive le informazioni generali della banca dati.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Caratteristiche</Accordion.Header>
                    <Accordion.Body>
                        Qui puoi trovare le caratteristiche principali della banca dati.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Vantaggi</Accordion.Header>
                    <Accordion.Body>
                        Questo paragrafo descrive i vantaggi di utilizzare la banca dati.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default BancaDatiDescription;
