// import React, { useState } from 'react';
import { Container, Col, Row, Accordion } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


function ReportVendite() {

    return (
        <>
    <Accordion>
        <Row>
            <Col>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
            <Container className='text-center'>
         <h5>Mensili</h5>
        <hr />
         <h4>5</h4>

            </Container>
            </Accordion.Header>
        <Accordion.Body>
        Totale delle vendite effettuate nel mese in corso.
        </Accordion.Body>
      </Accordion.Item>
            </Col>
            <Col>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
            <Container className='text-center'>
         <h5>Provv. %</h5>
        <hr />
         <h4>15</h4>

            </Container>
            </Accordion.Header>
        <Accordion.Body>
        Provvigione attuale ,in base alle vendite effettuate, espressa in percentuale (%)
        </Accordion.Body>
      </Accordion.Item>
            </Col>
            <Col>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
            <Container className='text-center'>
         <h5>Provv. €</h5>
        <hr />
         <h4>75</h4>

            </Container>
            </Accordion.Header>
        <Accordion.Body>
        Provvigione attuale ,in base alla quantità e al costo dei corsi venduti, espressa in euro (€)
        </Accordion.Body>
      </Accordion.Item>
            </Col>
            <Col>
      <Accordion.Item eventKey="3">
        <Accordion.Header>
            <Container className='text-center'>
         <h5>Mancanti</h5>
        <hr />
         <h4>1</h4>

            </Container>
            </Accordion.Header>
        <Accordion.Body>
        Vendite mancanti per lo scaglione sucessivo.
        </Accordion.Body>
      </Accordion.Item>
            </Col>

        </Row>
    </Accordion>

            {/* <Row className='flex-nowrap'>
                <Col xs={3} className=' border border-2 border-primary-subtle rounded text-center m-2 text-white' style={{ background: 'rgb(84,154,219)' }}>
                <h5 className='mt-1'>Mensili</h5>
                <hr />
                <h4 className=' text-center'> 5 </h4>
                </Col>
                <Col xs={3} className=' border border-2 border-primary-subtle rounded text-center m-2 text-white' style={{ background: 'rgb(84,154,219)' }}>
                <h5 className='mt-1'>Provv. %</h5>
                <hr />
                <h4 className=' text-center'> 15 </h4>
                </Col>
                <Col xs={3} className=' border border-2 border-primary-subtle rounded text-center m-2 text-white' style={{ background: 'rgb(84,154,219)' }}>
                <h5 className='mt-1'>Provv. €</h5>
                <hr />
                <h4 className=' text-center'> 75 </h4>
                </Col>
                <Col xs={3} className=' border border-2 border-primary-subtle rounded text-center m-2 text-white' style={{ background: 'rgb(84,154,219)' }}>
                <h5 className='mt-1'>Mancanti</h5>
                <hr />
                <h4 className=' text-center'> 15 </h4>
                </Col>

            </Row> */}
        </>
    );
}


export default ReportVendite;