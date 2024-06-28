import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RegistrazioneVendite() {
  const [formData, setFormData] = useState({
    data: new Date(),
    nomeProdotto: '',
    costo: '',
    nominativo: '',
    numeroAcquisti: '', 
    sconto: '',
    note: '' 
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Funzione per calcolare lo sconto massimo in base alla quantità di acquisti
    const calculateDiscount = (numeroAcquisti) => {
      if (numeroAcquisti >= 1 && numeroAcquisti <= 5) {
        return 15;
      } else if (numeroAcquisti >= 6 && numeroAcquisti <= 10) {
        return 20;
      } else if (numeroAcquisti >= 11 && numeroAcquisti <= 15) {
        return 25;
      } else if (numeroAcquisti >= 16) {
        return 30;
      } else {
        return 0;
      }
    };

    // Aggiorna lo sconto nel formData quando cambia il numero di acquisti
    setFormData(prevData => ({
      ...prevData,
      sconto: calculateDiscount(prevData.numeroAcquisti)
    }));
  }, [formData.numeroAcquisti]);

  // Funzione per calcolare lo sconto massimo in base alla quantità di acquisti
  const calculateMaxDiscount = (numeroAcquisti) => {
    if (numeroAcquisti >= 1 && numeroAcquisti <= 5) {
      return 15;
    } else if (numeroAcquisti >= 6 && numeroAcquisti <= 10) {
      return 20;
    } else if (numeroAcquisti >= 11 && numeroAcquisti <= 15) {
      return 25;
    } else if (numeroAcquisti >= 16) {
      return 30;
    } else {
      return 0;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Gestisce cambiamenti nel form input
    if (name === 'sconto') {
      // Controllo per assicurare che lo sconto non superi il massimo consentito
      const maxDiscount = calculateMaxDiscount(formData.numeroAcquisti);
      const parsedValue = parseFloat(value);
      const newValue = parsedValue > maxDiscount ? maxDiscount.toString() : value;

      setFormData(prevData => ({
        ...prevData,
        [name]: newValue
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date) => {
    // Gestisce il cambio di data nel datepicker
    setFormData(prevData => ({
      ...prevData,
      data: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Verifica la validità del form
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      // Verifica che lo sconto non superi il massimo consentito
      const maxDiscount = calculateMaxDiscount(formData.numeroAcquisti);
      const parsedSconto = parseFloat(formData.sconto);
      const effectiveSconto = parsedSconto > maxDiscount ? maxDiscount : parsedSconto;

      setLoading(true); // Mostra indicatore di caricamento

      // Simula una richiesta al server
      setTimeout(() => {
        console.log('Form Data:', { ...formData, sconto: effectiveSconto });
        resetForm();
        setLoading(false); // Nasconde indicatore di caricamento
      }, 1500); // Simula un ritardo di 1.5 secondi
    }

    form.classList.add('was-validated');
  };

  const resetForm = () => {
    // Resettare il form ai valori iniziali
    setFormData({
      data: new Date(),
      nomeProdotto: '',
      costo: '',
      nominativo: '',
      numeroAcquisti: '',
      sconto: '',
      note: ''
    });
    setValidated(false);
    document.getElementById('vendite-form').classList.remove('was-validated');
  };

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-12'>
          <div className='card bg-light shadow my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <div className='card-body p-5 d-flex flex-column'>
              <h2 className="fw-bold mb-4 text-center text-primary">Registrazione Vendite</h2>
              <form id='vendite-form' noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor='data' className='form-label'>Data</label>
                  <DatePicker
                    className='form-control'
                    selected={formData.data}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    required
                  />
                  <div className='invalid-feedback'>
                    Seleziona una data.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='nominativo' className='form-label'>Azienda</label>
                  <input
                    className='form-control'
                    id='nominativo'
                    name='nominativo'
                    value={formData.nominativo}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il nome dell'azienda.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='privato' className='form-label'>Privato</label>
                  <input
                    className='form-control'
                    id='privato'
                    name='privato'
                    value={formData.privato}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il cliente privato.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='nomeProdotto' className='form-label'>Prodotto</label>
                  <input
                    className='form-control'
                    id='nomeProdotto'
                    name='nomeProdotto'
                    value={formData.nomeProdotto}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il nome del prodotto.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='numeroAcquisti' className='form-label'>Quantità</label>
                  <input
                    className='form-control'
                    id='numeroAcquisti'
                    name='numeroAcquisti'
                    type='number'
                    value={formData.numeroAcquisti}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci la quantità di acquisto.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='costo' className='form-label'>Prezzo</label>
                  <input
                    className='form-control'
                    id='costo'
                    name='costo'
                    type='number'
                    step='0.01'
                    value={formData.costo}
                    onChange={handleChange}
                    required
                  />
                  <div className='invalid-feedback'>
                    Inserisci il costo del prodotto.
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='sconto' className='form-label'>Sconto % (Massimo: {calculateMaxDiscount(formData.numeroAcquisti)}%)</label>
                  <input
                    className='form-control'
                    id='sconto'
                    name='sconto'
                    type='number'
                    value={formData.sconto}
                    onChange={handleChange}
                    max={calculateMaxDiscount(formData.numeroAcquisti)}
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='note' className='form-label'>Note</label>
                  <textarea
                    className='form-control'
                    id='note'
                    name='note'
                    value={formData.note}
                    onChange={handleChange}
                    rows='3'
                  ></textarea>
                </div>
                <button className='btn btn-primary btn-lg w-100 mb-4' type="submit" disabled={loading}>
                  {loading ? 'Caricamento...' : 'Registra Vendita'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrazioneVendite;

