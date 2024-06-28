import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrazioneClientePrivato() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    indirizzo: '',
    codiceFiscale: '',
    email: '',
    numeroTelefono: '',
    provincia: '',
    regione: '',
    comune: '',
    note: ''
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true); // Show loading indicator

      // Simulate a server request
      setTimeout(() => {
        console.log('Form Data:', formData);
        resetForm();
        setLoading(false); // Hide loading indicator
      }, 1500); // Simulate a 1.5 second delay
    }

    form.classList.add('was-validated');
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cognome: '',
      indirizzo: '',
      codiceFiscale: '',
      email: '',
      numeroTelefono: '',
      provincia: '',
      regione: '',
      comune: '',
      note: ''
    });
    setValidated(false);
    document.getElementById('cliente-privato-form').classList.remove('was-validated');
  };

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div className='col-12 col-md-8 col-lg-6'>
          <div className='card bg-light shadow my-5 mx-auto' style={{ borderRadius: '1rem' }}>
            <div className='card-body p-5'>
              <h2 className="fw-bold mb-4 text-center text-primary">Registrazione Cliente Privato</h2>
              <form id='cliente-privato-form' noValidate validated={validated.toString()} onSubmit={handleSubmit}>
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
                <div className='row'>
                  <div className='col-md-4 mb-4'>
                    <label htmlFor='provincia' className='form-label'>Provincia</label>
                    <input
                      className='form-control'
                      id='provincia'
                      name='provincia'
                      value={formData.provincia}
                      onChange={handleChange}
                      required
                    />
                    <div className='invalid-feedback'>
                      Inserisci la provincia.
                    </div>
                  </div>
                  <div className='col-md-4 mb-4'>
                    <label htmlFor='regione' className='form-label'>Regione</label>
                    <input
                      className='form-control'
                      id='regione'
                      name='regione'
                      value={formData.regione}
                      onChange={handleChange}
                      required
                    />
                    <div className='invalid-feedback'>
                      Inserisci la regione.
                    </div>
                  </div>
                  <div className='col-md-4 mb-4'>
                    <label htmlFor='comune' className='form-label'>Comune</label>
                    <input
                      className='form-control'
                      id='comune'
                      name='comune'
                      value={formData.comune}
                      onChange={handleChange}
                      required
                    />
                    <div className='invalid-feedback'>
                      Inserisci il comune.
                    </div>
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='indirizzo' className='form-label'>Indirizzo</label>
                  <input
                    className='form-control'
                    id='indirizzo'
                    name='indirizzo'
                    value={formData.indirizzo}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci l'indirizzo.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='codiceFiscale' className='form-label'>Codice Fiscale</label>
                  <input
                    className='form-control'
                    id='codiceFiscale'
                    name='codiceFiscale'
                    value={formData.codiceFiscale}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il codice fiscale.
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
                  <label htmlFor='numeroTelefono' className='form-label'>Numero di Telefono</label>
                  <input
                    className='form-control'
                    id='numeroTelefono'
                    name='numeroTelefono'
                    value={formData.numeroTelefono}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il numero di telefono.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='note' className='form-label'>Note</label>
                  <textarea
                    className='form-control'
                    id='note'
                    name='note'
                    value={formData.note}
                    onChange={handleChange}
                  />
                </div>
                <button className='btn btn-primary btn-lg w-100 mb-4' type="submit" disabled={loading}>
                  {loading ? 'Caricamento...' : 'Registra Cliente Privato'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrazioneClientePrivato;
