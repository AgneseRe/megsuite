import React, { useState, useEffect } from 'react';
import { Button,Container, Table, Form } from 'react-bootstrap';
import API from '../../API.mjs';

function TabellaVendite() {
    const [vendite, setVendite] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVendita, setSelectedVendita] = useState(null);

    const handleShowModal = (vendita) => {
        setSelectedVendita(vendita);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setSelectedVendita(null);
        setShowModal(false);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVendite = vendite.filter((vendita) =>
        Object.values(vendita).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    
    const deleteVendita = async (idVendita) => {
        try {
            await API.deleteVendita(idVendita); // Chiamata API per eliminare la vendita
            setVendite(vendite.filter(vendite => vendite.idVendita !== idVendita)); // Aggiorna lo stato locale rimuovendo la vendita eliminato
        } catch (error) {
            console.error('Errore durante l\'eliminazione della vendita:', error);
        }
    };
    useEffect(() => {
        const getVendite = async () => {
            const vendite = await API.getVendite();
            setVendite(vendite);
        };
        getVendite();
    }, []);


    return (
        <Container className="my-4">
          
            
            <Form.Group controlId="filtra" className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Cerca..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Form.Group>

            <Table bordered responsive className="table-custom">
                <thead className="thead-dark">
                    <tr>
                        <th>Data</th>
                        <th>Azienda/Privato</th>
                        <th>Prodotto</th>           
                        <th>Quantità</th>
                        <th>Prezzo Iniziale</th>
                        <th>Prezzo Scontato</th>
                        <th>Sconto%</th>
                        <th>Provvigione del Funzionario €</th>
                        <th>Funzionario</th>                      
                        <th>Fatturato</th>
                        <th>Supporto Docente</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                {vendite.map((vendita) => (
                    <VenditaRow key={vendita.idVendita} vendita={vendita} handleShowModal={handleShowModal} deleteVendita={deleteVendita} />
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

function VenditaRow(props) {
    return (
        <tr>
            <td>{props.vendita.data}</td>
            <td>{props.vendita.tipologiaCliente}</td>
            <td>{props.vendita.prodotto}</td>
            <td>{props.vendita.quantità}</td>
            <td>{props.vendita.prezzoListino}</td>
            <td>{Number(props.vendita.prezzoListino)*(1-Number(props.vendita.sconto)/100)}</td>
            <td>{props.vendita.sconto}</td>
            <td></td>
            <td>{props.vendita.funzionario}</td>
            <td></td>
            <td>{props.vendita.supportoDocente}</td>
            <td>
                <Button variant="primary" onClick={() => props.handleShowModal(props.vendita)}><i className="bi bi-info-circle"></i></Button>{' '}
                <Button variant="warning"><i className="bi bi-pen"></i></Button>{' '}
                <Button variant="danger" onClick={() => props.deleteVendita(props.azienda.idVendita)}><i className="bi bi-x-circle"></i></Button>
            </td>
        </tr>
    );
}

function VenditaModal(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Vendita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                da inserire
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseModal}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TabellaVendite;
