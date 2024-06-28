import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../API.mjs';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const credenziali = { username, password };

    try {
        const user = await API.logIn(credenziali);
        
  
        console.log('User:', user);

        props.handleRuolo(user.ruolo);
        props.setUser(user); 
        setError(''); 
        navigate('/profilo'); 
    } catch (error) {
        setError('Username o password errati'); 
    }
};


  return (
    <div className="login-container">
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              minLength={4}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>
          {error && <p className="error-message">{error}</p>} {/* Messaggio di errore */}
          <Button variant="primary" type="submit" className="btn-primary">
            Log In
          </Button>
        </Form>
        <div className="login-actions">
          <p>
            Se non sei ancora registrato, accedi con:
            <br />
            <Link to="/registrazione-funzionario" className="btn btn-outline-primary mr-2">
              Area riservata
            </Link>
            <Link to="/registrazione-guest" className="btn btn-outline-secondary">
              Area guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
