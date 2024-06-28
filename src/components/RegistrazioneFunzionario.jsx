import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrazioneFunzionario() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    username: '',
    email: '',
    password: '',
    confermaPassword: '',
    telefono: '',
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || formData.password !== formData.confermaPassword) {
      e.stopPropagation();
      setValidated(true);
      if (formData.password !== formData.confermaPassword) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    } else {
      setLoading(true);

      setTimeout(() => {
        console.log('Form Data:', formData);
        resetForm();
        setLoading(false);
      }, 1500);
    }

    form.classList.add('was-validated');
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cognome: '',
      username: '',
      email: '',
      password: '',
      confermaPassword: '',
      telefono: '',
    });
    setValidated(false);
    setPasswordMatchError(false);
    document.getElementById('funzionario-form').classList.remove('was-validated');
  };

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div className='col-12 col-md-8 col-lg-6'>
          <div className='card bg-light shadow my-5 mx-auto' style={{ borderRadius: '1rem' }}>
            <div className='card-body p-5'>
              <h2 className="fw-bold mb-4 text-center text-primary">Registrazione Funzionario</h2>

              <form id='funzionario-form' noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor='nome' className='form-label'>Nome</label>
                  <input
                    className='form-control'
                    id='nome'
                    name='nome'
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il nome.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='cognome' className='form-label'>Cognome</label>
                  <input
                    className='form-control'
                    id='cognome'
                    name='cognome'
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il cognome.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='username' className='form-label'>Username</label>
                  <input
                    className='form-control'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci un username.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='email' className='form-label'>Email</label>
                  <input
                    className='form-control'
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci un indirizzo email valido.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='password' className='form-label'>Password</label>
                  <input
                    className='form-control'
                    id='password'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci una password.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='confermaPassword' className='form-label'>Conferma Password</label>
                  <input
                    className='form-control'
                    id='confermaPassword'
                    type='password'
                    name='confermaPassword'
                    value={formData.confermaPassword}
                    onChange={handleChange}
                    required
                  />
                  {passwordMatchError && (
                    <div className='invalid-feedback'>
                      Le password non corrispondono.
                    </div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='telefono' className='form-label'>Telefono</label>
                  <input
                    className='form-control'
                    id='telefono'
                    name='telefono'
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il numero di telefono.
                  </div>
                </div>
                <p className="mb-4 text-center">Sarai registrato come guest per il momento. Il tuo ruolo sarà assegnato dall'amministratore.</p>
                <button className='btn btn-primary btn-lg w-100 mb-4' type="submit" disabled={loading}>
                  {loading ? 'Caricamento...' : 'Registra Funzionario'}
                </button>
              </form>

              <div className="text-center">
                <Link to="/loginapp" className="btn btn-outline-primary">Torna alla pagina precedente</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrazioneFunzionario;
