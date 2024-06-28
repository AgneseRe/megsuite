import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Table, Form, Button } from 'react-bootstrap';

function PanelloDiControllo() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Dati di esempio per le vendite
    const venditeDiEsempio = [
        {
            data: '2023-06-15',
            aziendeprivato: 'Azienda 1',
            prodotto: 'Prodotto A',
            quantità: 10,
            prezzoIniziale: 100,
            prezzoScontato: 80,
            sconto: 20,
            provvigioneFunzionario: 10,
            funzionario: 'Mario Rossi',
            manager: 'Luigi Verdi',
            fatturato: 800
        },
        {
            data: '2023-06-16',
            aziendeprivato: 'Privato 1',
            prodotto: 'Prodotto B',
            quantità: 5,
            prezzoIniziale: 50,
            prezzoScontato: 40,
            sconto: 20,
            provvigioneFunzionario: 5,
            funzionario: 'Giovanna Bianchi',
            manager: 'Carlo Neri',
            fatturato: 200
        },
        // Aggiungi altri dati di esempio se necessario
    ];

    const [aziende, setAziende] = useState(venditeDiEsempio);

    const handleDelete = (index) => {
        // Implementazione della logica per eliminare l'elemento in base all'indice
        const updatedAziende = [...aziende];
        updatedAziende.splice(index, 1);
        setAziende(updatedAziende);
    };

    const handleEdit = (index) => {
        // Implementazione della logica per modificare l'elemento in base all'indice
        console.log('Modifica elemento con indice:', index);
        // Esempio: potresti navigare verso una pagina di modifica o mostrare un modale di modifica
    };

    const filteredAziende = aziende.filter((azienda) =>
        Object.values(azienda).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Pannello di controllo</h2>

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
                        <th className="col-data">Data</th>
                        <th>Azienda/Privato</th>
                        <th>Prodotto</th>
                        <th>Quantità</th>
                        <th>Prezzo Iniziale</th>
                        <th>Prezzo Scontato</th>
                        <th>Sconto%</th>
                        <th>Provvigione del Funzionario €</th>
                        <th>Funzionario</th>
                        <th>Manager</th>
                        <th>Fatturato</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAziende.map((vendita, index) => (
                        <tr key={index}>
                            <td className="col-data">{vendita.data}</td>
                            <td>{vendita.aziendeprivato}</td>
                            <td>{vendita.prodotto}</td>
                            <td>{vendita.quantità}</td>
                            <td>{vendita.prezzoIniziale}</td>
                            <td>{vendita.prezzoScontato}</td>
                            <td>{vendita.sconto}</td>
                            <td>{vendita.provvigioneFunzionario}</td>
                            <td>{vendita.funzionario}</td>
                            <td>{vendita.manager}</td>
                            <td>{vendita.fatturato}</td>
                            <td>
                                <Button variant="white" onClick={handleShow}>
                                    <img src='Elimina.png' alt='elimina' height={'20px'} />
                                </Button>
                                {' '}
                                <Button variant="white" onClick={() => handleEdit(index)}>
                                    <img src='Modifica.png' alt='modifica' height={'20px'} />
                                </Button>
                            </td>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Eliminazione</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Sei sicuro di voler eliminare l'elemento?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Chiudi
                                    </Button>
                                    <Button variant="primary" onClick={() => { handleDelete(index); handleClose(); }}>Elimina</Button>
                                </Modal.Footer>
                            </Modal>
                        </tr>
                    ))}





                </tbody>
            </Table>
        </Container>
    );
}

export default PanelloDiControllo;
