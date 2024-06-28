import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './NavHeader.css'; // Import the custom CSS file

const navStyle = {
    backgroundColor: '#0B5C92'
};

function NavHeader( props ) {
   

    return (
        <Navbar style={navStyle} expand="lg" variant="dark" className="fixed-top">
            <Container className="nav-inner-container">
                <Link to="/home" className="navbar-brand d-flex align-items-center">
                    <img
                        src="/Logo MegSuiteApp.png"
                        width="90"
                        height="90"
                        className="d-inline-block align-top"
                        alt="Meg logo"
                    />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex align-items-center">
                        {props.ruolo === "" ? <Link className="nav-link" to="/loginapp">Login</Link> : ""}
                        {props.ruolo === "admin" ? <Link className="nav-link" to="/panellodicontrollo">Pannello di controllo</Link> : ""}
                        {props.ruolo === "funzionario" || props.ruolo === "manager" ? <Link className="nav-link" to="/vendite">Le mie vendite</Link> : ""}
                        {(props.ruolo === "funzionario" || props.ruolo === "manager" || props.ruolo === "admin") && (
                            <NavDropdown title="Banca Dati" id="navbarScrollingDropdown">
                                <Link className="dropdown-item" to="/aziende">Aziende</Link>
                                <Link className="dropdown-item" to="/privati">Privati</Link>
                            </NavDropdown>
                        )}
                        {props.ruolo === "funzionario" || props.ruolo === "manager" ? <Link className="nav-link" to="/lista-utenti">Lista Utenti</Link> : ""}
                        {props.ruolo === "admin" ? <Link className="nav-link" to="/gestione-utenti">Gestione Utenti</Link> : ""}
                        {(props.ruolo === "funzionario" || props.ruolo === "manager" || props.ruolo === "admin" || props.ruolo === "guest") && (
                            <Link className="nav-link" to="/profilo">Il mio profilo</Link>
                        )}
                        {(props.ruolo === "funzionario" || props.ruolo === "manager" || props.ruolo === "admin" || props.ruolo === "guest") && (
                            <Link className="nav-link" to="/live-chat">Chat Live</Link>
                        )}
                        {(props.ruolo === "funzionario" || props.ruolo === "admin" || props.ruolo === "manager") && (
                            <NavDropdown title="Registrazione" id="navbarScrollingDropdown">
                                <Link className="dropdown-item" to="/registrazione-azienda">Registra azienda</Link>
                                <Link className="dropdown-item" to="/registrazione-privato">Registra privato</Link>
                                <Link className="dropdown-item" to="/registrazione-vendite">Registra vendita</Link>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavHeader;
