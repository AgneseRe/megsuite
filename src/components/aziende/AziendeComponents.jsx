import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { Button, Container, Modal, Row, Col, Table } from "react-bootstrap";

import { useState, useEffect } from "react";
import API from "../../../API.mjs";

function AziendeComponents(props) {

    
    const [aziende, setAziende] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAzienda, setSelectedAzienda] = useState(null);
    
    const [showModalDelete, setModalDelete] = useState(false);
    const handleShowModalDelete = (azienda) => {
        setModalDelete(true);
        setSelectedAzienda(azienda);
    }
    const handleShowModal = (azienda) => {
        setSelectedAzienda(azienda);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setSelectedAzienda(null);
        setShowModal(false);
    }

    const deleteAzienda = async (idAzienda) => {
        try {
            await API.deleteAzienda(idAzienda); // Chiamata API per eliminare l'azienda
            setAziende(aziende.filter(azienda => azienda.idAzienda !== idAzienda)); // Aggiorna lo stato locale rimuovendo l'azienda eliminata
        } catch (error) {
            console.error('Errore durante l\'eliminazione dell\'azienda:', error);
        }
    }

    useEffect(() => {
        const getAziende = async () => {
            const aziende = await API.getAziende();
            setAziende(aziende);
        }
        getAziende();
    }, []);

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col lg={11} className="mx-auto">
                        <small>Sono di seguito riportate tutte le aziende finora registrate. Nel caso in cui si desideri aggiungere una nuova azienda, recarsi nella
                            pagina dedicata disponibile nella barra di navigazione.</small>
                    </Col>
                </Row>
                <Row>
                    <Col lg={11} className="mx-auto mt-3">
                        <AziendeTable handleShowModalDelete={handleShowModalDelete} aziende={aziende} handleShowModal={handleShowModal} deleteAzienda={deleteAzienda}
                        handleModeEditAziende={props.handleModeEditAziende} handleEditableAzienda={props.handleEditableAzienda}></AziendeTable>
                    </Col>
                </Row>
                {selectedAzienda && <AziendaModal show={showModal} azienda={selectedAzienda} handleCloseModal={handleCloseModal} />}
                {selectedAzienda && <ModalDelete show={showModalDelete} azienda={selectedAzienda} />}
            </Container>
        </>
    );
}

function AziendeTable(props) {

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>Ragione Sociale </th>
                    <th>Settore</th>
                    <th>Comune</th>
                    <th>Regione</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.aziende.map((azienda) => <AziendaRow handleShowModalDelete={props.handleShowModalDelete} key={azienda.idAzienda} azienda={azienda}
                    handleShowModal={props.handleShowModal} deleteAzienda={props.deleteAzienda}
                    handleModeEditAziende={props.handleModeEditAziende} handleEditableAzienda={props.handleEditableAzienda} />)}
            </tbody>
        </Table>
    );
}

function AziendaRow(props) {
    return (
        <tr>
            <td>{props.azienda.ragioneSociale}</td>
            <td>{props.azienda.settore}</td>
            <td>{props.azienda.comune}</td>
            <td>{props.azienda.regione}</td>
            <td>{props.azienda.email}</td>
            <td>{props.azienda.telefono}</td>
            <td>
                <Button variant="primary" onClick={() => props.handleShowModal(props.azienda)}><i className="bi bi-info-circle"></i></Button>{' '}
                <Button variant="warning" onClick={() => {props.handleModeEditAziende(); props.handleEditableAzienda(props.azienda)}}><i className="bi bi-pen"></i></Button>{' '}
                <Button variant="danger" onClick={() => props.handleShowModalDelete(props.azienda)}><i className="bi bi-x-circle"></i></Button>
            </td>
        </tr>
    );
}

function AziendaModal(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>{props.azienda.ragioneSociale}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Settore: {props.azienda.settore}<br /><br />
                Indirizzo: {props.azienda.indirizzo}<br />
                Comune: {props.azienda.comune}<br />
                Provincia: {props.azienda.provincia}<br />
                Regione: {props.azienda.regione}<br />
                Email principale: {props.azienda.email}<br />
                Email secondaria: {props.azienda.email2}<br />
                Telefono: {props.azienda.telefono}<br />
                Sito web: <a href={props.azienda.sitoWeb}>{props.azienda.sitoWeb}</a><br />
                Codice SDI: {props.azienda.sdi}<br />
                Note: {props.azienda.note}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleCloseModal()}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalDelete(props) {
    return (
        <Modal
            show={props.showModalDelete} >
            <Modal.Header>
                <Modal.Title>Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Sei sicuro di voler eliminare l'azienda {props.azienda.ragioneSociale}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" >Chiudi</Button>
                <Button variant="primary">Elimina</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AziendeComponents;