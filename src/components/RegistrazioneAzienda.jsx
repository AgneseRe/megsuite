import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';

import Azienda from "./../../Azienda.js";
import API from "../../API.mjs";
import { useNavigate } from 'react-router-dom';

// array regioni per popolare Form.Select nel form di registrazione
const regioniItaliane = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia Romagna", "Friuli Venezia Giulia", "Lazio", "Liguria",
  "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige",
  "Umbria", "Valle d'Aosta", "Veneto" ];


function RegistrazioneAzienda(props) {

  const navigate = useNavigate();
  
  const [ragioneSociale, setRagioneSociale] = useState(props.editableAzienda ? props.editableAzienda.ragioneSociale : '');
  const [settore, setSettore] = useState(props.editableAzienda ? props.editableAzienda.settore : '');
  const [indirizzo, setIndirizzo] = useState(props.editableAzienda ? props.editableAzienda.indirizzo : '');
  const [comune, setComune] = useState(props.editableAzienda ? props.editableAzienda.comune : '');
  const [provincia, setProvincia] = useState(props.editableAzienda ? props.editableAzienda.provincia : '');
  const [regione, setRegione] = useState(props.editableAzienda ? props.editableAzienda.regione : '');
  const [email1, setEmail1] = useState(props.editableAzienda ? props.editableAzienda.email : '');
  const [email2, setEmail2] = useState(props.editableAzienda ? props.editableAzienda.email2 : '');
  const [telefono, setTelefono] = useState(props.editableAzienda ? props.editableAzienda.telefono : '');
  const [codiceSDI, setCodiceSDI] = useState(props.editableAzienda ? props.editableAzienda.sdi : '');
  const [sitoWeb, setSitoWeb] = useState(props.editableAzienda ? props.editableAzienda.sitoWeb : '');
  const [note, setNote] = useState(props.editableAzienda ? props.editableAzienda.note : '');
  {/*const [allegato, setAllegato] = useState('');*/}
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // creazione nuova azienda, a partire dai dati inseriti nel form
    const azienda = {ragioneSociale, settore, indirizzo, comune, provincia, regione, email1, 
      email2, telefono, codiceSDI, sitoWeb, note}
    // aggiunta nuova azienda
    if(props.modeAziende === 'add')
      API.addAzienda(azienda)
      .then(() => navigate("/aziende"));
    else // props.modeAziende === 'edit'
      API.updateAzienda({idAzienda: props.editableAzienda.idAzienda, ...azienda})
      .then(() => navigate("/aziende"));
  }

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-12'>
          <Card className='bg-light shadow my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '800px' }}>
            <Card.Body className='p-5'>
              {props.modeAziende === 'add' ? <h2 className="fw-bold mb-4 text-center">Registrazione Azienda</h2> : <h2 className="fw-bold mb-4 text-center">Modifica Azienda</h2>}
              <Form onSubmit={handleSubmit}>

                <Row className='mb-4'> {/* First row with Ragione Sociale e Settore */}
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Ragione Sociale</Form.Label>
                    <Form.Control type='text' required={true} value={ragioneSociale} onChange={(ev) => setRagioneSociale(ev.target.value)}/>
                  </Form.Group>
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Settore</Form.Label>
                    <Form.Control type='text' required={true} value={settore} onChange={(ev) => setSettore(ev.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className='mb-4'> {/* Second row with Regione e Provincia */}
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Regione</Form.Label>
                    <Form.Select required={true} value={regione} onChange={(ev) => setRegione(ev.target.value)}>
                      {regioniItaliane.map((regione) => <option value={regione} key={regione}>{regione}</option>)}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control type='text' required={true} value={provincia} onChange={(ev) => setProvincia(ev.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className='mb-4'> {/* Third row with Comune e Indirizzo */}
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Comune</Form.Label>
                    <Form.Control type='text' required={true} value={comune} onChange={(ev) => setComune(ev.target.value)}/>
                  </Form.Group>
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Indirizzo</Form.Label>
                    <Form.Control type='text' placeholder='es. Via Verdi 5' required={true} value={indirizzo} onChange={(ev) => setIndirizzo(ev.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className='mb-4'> {/* Fourth row with Email1 e Email2 */}
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required={true} value={email1} onChange={(ev) => setEmail1(ev.target.value)}/>
                  </Form.Group>
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Email secondaria</Form.Label>
                    <Form.Control type='email' value={email2} onChange={(ev) => setEmail2(ev.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className='mb-4'> {/* Fifth row with Numero di telefono e SDI */}
                  <Form.Group as={Col} md='6'>
                    <Form.Label>Numero di Telefono</Form.Label>
                    <Form.Control type='text' required={true} value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                  </Form.Group>
                  <Form.Group as={Col} md='6'>
                    <Form.Label>SDI (se non conosciuto, inserire 0000000)</Form.Label>
                    <Form.Control type='text' minLength={7} maxLength={7} required={true} value={codiceSDI} onChange={(ev) => setCodiceSDI(ev.target.value)}/>
                  </Form.Group>
                </Row>

                <Row className='mb-4'> {/* Sixth row with Note */}
                  <Form.Group as={Col} md='12'>
                  <Form.Label>Sito Web</Form.Label>
                    <Form.Control type='text' value={sitoWeb} onChange={(ev) => setSitoWeb(ev.target.value)}/>
                  </Form.Group> 
                </Row>

                <Row className='mb-4'> {/* Seventh row with Note */}
                  <Form.Group as={Col} md='12'>
                    <Form.Label>Note</Form.Label>
                    <Form.Control as='textarea' value={note} onChange={(ev) => setNote(ev.target.value)}/>
                  </Form.Group>
                </Row>

                {/*<Row className='mb-4'> {/* Eighth row for attachment
                  <Form.Group as={Col} md='12'>
                    <Form.Label>Allega File (max 5MB)</Form.Label>
                    <Form.Control type='file' accept='.pdf,.doc,.docx,.xls,.xlsx'/>
                  </Form.Group>
                </Row>*/}

                <Row className='mb-4'> {/* Nineth row with submit Button */}
                  <Col md='12'>
                    {props.modeAziende === 'add' ? <Button variant='primary' type='submit'>Registra</Button> : <Button variant='warning' type='submit'>Modifica</Button>}
                  </Col>
                </Row>

              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RegistrazioneAzienda;
