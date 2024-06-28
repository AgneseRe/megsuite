import React, { useState } from "react";
import { Form, Row } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = ({ guests, onUserSelect }) => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(false);

    const handleSearch = () => {
        setErr(false);
        if (username.trim() === "") {
            setUsers([]);
        } else {
            const foundUsers = guests.filter(user =>
                user.username.toLowerCase().includes(username.toLowerCase())
            );
            if (foundUsers.length > 0) {
                setUsers(foundUsers);
            } else {
                setUsers([]);
                setErr(true);
            }
        }
    };

    const handleKey = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    };

    const handleSelect = (selectedUser) => {
        console.log("Utente selezionato:", selectedUser);
        setUsername("");
        setUsers([]); // Nascondere i risultati della ricerca
        onUserSelect(selectedUser); // Passa l'utente selezionato a onUserSelect
    };

    return (
        <Row className="search col-12">
            <Form.Group controlId="search" className="mb-0">
                <Form.Control
                    type="text"
                    placeholder="Cerca un utente"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </Form.Group>
            {err && <span>Spiacenti. Nessun risultato trovato per "{username}"</span>}
            {users.map(user => (
                <div key={user.id} className="userChat" onClick={() => handleSelect(user)}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.username}</span>
                    </div>
                </div>
            ))}
        </Row>
    );
};

export default SearchBar;
