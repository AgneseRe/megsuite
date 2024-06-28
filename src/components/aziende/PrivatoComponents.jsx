import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Container, Modal, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import API from "../../../API.mjs";

function PrivatoComponents() {
    const [privati, setPrivati] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPrivato, setSelectedPrivato] = useState(null);

    const handleShowModal = (privato) => {
        setSelectedPrivato(privato);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedPrivato(null);
        setShowModal(false);
    };

    const deletePrivato = async (idPrivato) => {
        try {
            await API.deletePrivato(idPrivato); // Chiamata API per eliminare il privato
            setPrivati(privati.filter(privato => privato.idPrivato !== idPrivato)); // Aggiorna lo stato locale rimuovendo il privato eliminato
        } catch (error) {
            console.error('Errore durante l\'eliminazione del privato:', error);
        }
    };

    useEffect(() => {
        const getPrivati = async () => {
            const privati = await API.getPrivati();
            setPrivati(privati);
        };
        getPrivati();
    }, []);

    return (
        <>
        <Container className="mt-3">
            <Row>
                <Col lg={11} className="mx-auto">
                    <small>Sono di seguito riportati tutti i privati finora registrati. Nel caso in cui si desideri aggiungere un nuovo privato, recarsi nella
                    pagina dedicata disponibile nella barra di navigazione.</small>
                </Col>
            </Row>
            <Row>
                <Col lg={11} className="mx-auto mt-3">
                    <PrivatiTable privati={privati} handleShowModal={handleShowModal} deletePrivato={deletePrivato}></PrivatiTable>
                </Col>
            </Row>
            {selectedPrivato && <PrivatoModal show={showModal} privato={selectedPrivato} handleCloseModal={handleCloseModal} />}
        </Container>
        </>
    );
}

function PrivatiTable(props) {
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Indirizzo</th>
                    <th>Comune</th>
                    <th>Provincia</th>
                    <th>Regione</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.privati.map((privato) => (
                    <PrivatoRow key={privato.idPrivato} privato={privato} handleShowModal={props.handleShowModal} deletePrivato={props.deletePrivato} />
                ))}
            </tbody>
        </Table>
    );
}

function PrivatoRow(props) {
    return (
        <tr>
            <td>{props.privato.nome}</td>
            <td>{props.privato.cognome}</td>
            <td>{props.privato.indirizzo}</td>
            <td>{props.privato.comune}</td>
            <td>{props.privato.provincia}</td>
            <td>{props.privato.regione}</td>
            <td>{props.privato.email}</td>
            <td>{props.privato.telefono}</td>
            <td>
                <Button variant="primary" onClick={() => props.handleShowModal(props.privato)}><i className="bi bi-info-circle"></i></Button>{' '}
                <Button variant="warning"><i className="bi bi-pen"></i></Button>{' '}
                <Button variant="danger" onClick={() => props.deletePrivato(props.privato.idPrivato)}><i className="bi bi-x-circle"></i></Button>
            </td>
        </tr>
    );
}

function PrivatoModal(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>{props.privato.nome} {props.privato.cognome}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Indirizzo: {props.privato.indirizzo}<br />
                Comune: {props.privato.comune}<br />
                Provincia: {props.privato.provincia}<br />
                Regione: {props.privato.regione}<br />
                Codice Fiscale: {props.privato.codiceFiscale}<br />
                Email: {props.privato.email}<br />
                Telefono: {props.privato.telefono}<br />
                Note: {props.privato.note}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseModal}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PrivatoComponents;
