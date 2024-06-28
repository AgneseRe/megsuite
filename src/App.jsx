import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavHeader from './components/NavHeader';
import BancaDatiDescription from './components/BancaDatiDescription';
import UserComponents from './components/UserComponents';
import Profilo from './components/Profilo';
import Immagine from './components/Immagine';
import Login from './components/Login';
import RegistrazioneAzienda from './components/RegistrazioneAzienda';
import RegistrazioneClientePrivato from './components/RegistrazioneClientePrivato';
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveChat from './components/chatComponents/LiveChat';
import UserList from './components/chatComponents/UserList.jsx';
import AdminUserList from './components/chatComponents/AdminUserList.jsx';
import RegistrazioneVendite from './components/RegistrazioneVendite';
import Vendita from './components/Vendita.jsx';
import PanelloDiControllo from './components/PanelloDiControllo.jsx';
import Guest from '../Guest.js';
import RegistrazioneGuest from './components/RegistrazioneGuest.jsx';
import RegistrazioneFunzionario from './components/RegistrazioneFunzionario.jsx';
import AziendeComponents from './components/aziende/AziendeComponents.jsx';
import PrivatoComponents from './components/aziende/PrivatoComponents.jsx';
import API from '../API.mjs';
import { useNavigate } from 'react-router-dom';

// Definizione degli ospiti
let guests = [
    new Guest(1, "@pippo", "kjg7845", "khdf37935", "Pippo", "Pollo", "jkhdf@gmial.com", "876358758"),
    new Guest(2, "@piphg", "kjg7845", "khdf37935", "Pippo", "Pollo", "jkhdf@gmial.com", "876358758"),
    new Guest(3, "@pifd", "kjg7845", "khdf37935", "Pippo", "Pollo", "jkhdf@gmial.com", "876358758"),
];

function App() {
    const [loggedin, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [ruolo, setRuolo] = useState("");
    const navigate = useNavigate();

    const [modeAziende, setModeAziende] = useState('add');
    const [editableAzienda, setEditableAzienda] = useState([]);
    
    const handleModeEditAziende = () => {
        setModeAziende('edit');
        navigate("/registrazione-azienda")
    }

    const handleEditableAzienda = (azienda) => {
        setEditableAzienda(azienda);
    }

    const handleLogout = async () => {
        try {
            await API.logOut();
            setLoggedIn(false);
            navigate('/loginapp');
            setRuolo("");
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleLogin = async (credenziali) => {
        try {
            const userLoggato = await API.logIn(credenziali);
            setUser(userLoggato);
            setLoggedIn(true);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleRuolo = (ruoloUtente) => {
        setRuolo(ruoloUtente);
    };

    return (
        <div className='container-fluid p-4'>
            <NavHeader ruolo={ruolo} username={user.username}/>
            <Routes>
                <Route path='/home' element={<Immagine />} />
                <Route path='/profilo' element={<Profilo logout={handleLogout} user={user} guests={guests} />} />
                <Route path='/panellodicontrollo' element={<PanelloDiControllo />} />
                <Route path='/users' element={<UserComponents />} />
                <Route path='/aziende' element={<AziendeComponents handleModeEditAziende={handleModeEditAziende} handleEditableAzienda={handleEditableAzienda} />} />
                <Route path='/vendite' element={<Vendita />} />
                <Route path='/banca-dati' element={<BancaDatiDescription />} />
                <Route path='/loginapp' element={<Login login={handleLogin} loggedin={loggedin} handleRuolo={handleRuolo} setUser={setUser} />} />
                <Route path='/lista-utenti' element={<UserList guests={guests} />} />
                <Route path='/gestione-utenti' element={<AdminUserList users={guests} />} />
                <Route path='/live-chat' element={<LiveChat guests={guests} username={user.username} />} />
                <Route path='/registrazione-azienda' element={<RegistrazioneAzienda modeAziende={modeAziende} editableAzienda={editableAzienda} />} />
                <Route path='/registrazione-privato' element={<RegistrazioneClientePrivato />} />
                <Route path='/registrazione-vendite' element={<RegistrazioneVendite />} />  
                <Route path='/privati' element={<PrivatoComponents/>}/>
                <Route path="/registrazione-guest" element={<RegistrazioneGuest />}  />     
                <Route path="/registrazione-funzionario" element={<RegistrazioneFunzionario />}  />        
            </Routes>
        </div>
    );
}

export default App;
