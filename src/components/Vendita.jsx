import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReportVendite from './ReportVendite.jsx';
import TabellaVendite from './TabellaVendite.jsx';

function Vendita() {
    return (
        <Container className='my-4'>
              <h2 className="mb-4 text-center"> Vendita</h2>
            <Row className='justify-content-center'>
                <Col>
                    <ReportVendite />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col>
                    <TabellaVendite  />
                </Col>
            </Row>
        </Container>
    );
}

export default Vendita;
