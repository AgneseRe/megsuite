import User from "./User.js";
import Azienda from "./Azienda.js";
import Privato from "./Privato.js";
import Vendita from "./Vendita.js";


const API_BASE_URL = import.meta.env.VITE_API_URL;

const logOut =async()=>{
    const response=await fetch(`${API_BASE_URL}/api/sessions`,{
        method: 'DELETE',
        credentials: 'include'
    })
    if(response.ok){
        return null
    }
}
const logIn = async (credenziali) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credenziali),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const user = await response.json();
        
        return user; 
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
const getUserById =async (id)=>{
    const response=await fetch(`${API_BASE_URL}/api/users/${id}`);
    if(response.ok){
        const userJson=await response.json();
        return userJson;
    }else{
        throw  new Error("Error");
    }
}
const getUserByUsername =async (username)=>{
    const response=await fetch(`${API_BASE_URL}/api/users/${username}`);
    if(response.ok){
        const userJson=await response.json();
        return userJson;
    }else{
        throw  new Error("Error");
    }
}
const getUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    if (response.ok) {
        const usersJson = await response.json();
        return usersJson.map(user => new User(user.idUser, user.username, user.password, user.ruolo, user.nome, user.cognome, user.email, user.telefono));
    } else 
        throw new Error("Error");
}

const deleteUser = async() => {
    const response = fetch(`${API_BASE_URL}/api/users/:id`, "delete");
    if(response.ok) {
        return (await response).status;
    } else 
        throw new Error("error");
}


const getAziende = async () => {
    const response = await fetch(`${API_BASE_URL}/api/aziende`);
    if(response.ok) {
        const aziendeJSON = await response.json();
        return aziendeJSON.map(azienda => new Azienda(azienda.idAzienda, azienda.ragioneSociale, azienda.settore, azienda.indirizzo, azienda.comune,
            azienda.provincia, azienda.regione, azienda.email, azienda.email2, azienda.telefono, azienda.sitoWeb, azienda.sdi, azienda.note));
    } else {
        throw new Error("Error");
    }
}

const deleteAzienda = async(idAzienda) => {
    const response = await fetch(`${API_BASE_URL}/api/aziende/${idAzienda}`, {
            method: "DELETE"});
    if(response.ok) {
        return response.status;
    } else 
        throw new Error("error");
}

const addAzienda = async (azienda) => {
    const response = await fetch(`${API_BASE_URL}/api/aziende`, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ragioneSociale: azienda.ragioneSociale, settore: azienda.settore, indirizzo: azienda.indirizzo, comune: azienda.comune, 
            provincia: azienda.provincia, regione: azienda.regione, email: azienda.email1, email2: azienda.email2, telefono: azienda.telefono, 
            sitoWeb: azienda.sitoWeb, sdi: azienda.codiceSDI, note: azienda.note
        }), // corpo richiesta HTTP
        credentials: "include"
    });
    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
    } else 
        return null;
}

const updateAzienda = async (azienda) => {
    const response = await fetch(`${API_BASE_URL}/api/aziende/${azienda.idAzienda}`, {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({ragioneSociale: azienda.ragioneSociale, settore: azienda.settore, indirizzo: azienda.indirizzo, comune: azienda.comune, 
            provincia: azienda.provincia, regione: azienda.regione, email: azienda.email1, email2: azienda.email2, telefono: azienda.telefono, 
            sitoWeb: azienda.sitoWeb, sdi: azienda.codiceSDI, note: azienda.note
        }), // corpo richiesta HTTP
        credentials: "include"
    });
    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
    } else 
        return null;
}
const getPrivati = async () => {
    const response = await fetch(`${API_BASE_URL}/api/privati`);
    if (response.ok) {
        const privatiJson = await response.json();
        return privatiJson.map(privato => new Privato(privato.idPrivato, privato.nome, privato.cognome, privato.indirizzo, privato.comune, privato.provincia, privato.regione, privato.codiceFiscale, privato.email, privato.telefono, privato.note));
    } else {
        throw new Error("Error fetching private individuals");
    }
};


const deletePrivato = async (idPrivato) => {
    const response = await fetch(`${API_BASE_URL}/api/privati/${idPrivato}`, {
        method: "DELETE"
    });
    if (response.ok) {
        return response.status;
    } else {
        throw new Error("Error deleting private individual");
    }
};


const addPrivato = async (privato) => {
    const response = await fetch(`${API_BASE_URL}/api/privati`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(privato)
    });
    if (response.ok) {
        const newPrivato = await response.json();
        return new Privato(newPrivato.idPrivato, newPrivato.nome, newPrivato.cognome, newPrivato.indirizzo, newPrivato.comune, newPrivato.provincia, newPrivato.regione, newPrivato.codiceFiscale, newPrivato.email, newPrivato.telefono, newPrivato.note);
    } else {
        throw new Error("Error adding private individual");
    }
};

//VENDITE
const getVendite = async () => {
    const response = await fetch(`${API_BASE_URL}/api/vendite`);
    if (response.ok) {
        const venditeJson = await response.json();
        return venditeJson.map(vendita => new Vendita(vendita.idVendita, vendita.tipologiaCliente, vendita.prodotto, vendita.quantità, vendita.prezzoListino, vendita.sconto, vendita.data, vendita.supporto, vendita.funzionario, vendita.manager));
    } else {
        throw new Error("Error fetching private individuals");
    }
};


const deleteVendita = async (idVendita) => {
    const response = await fetch(`${API_BASE_URL}/api/vendite/${idVendita}`, {
        method: "DELETE"
    });
    if (response.ok) {
        return response.status;
    } else {
        throw new Error("Error deleting private individual");
    }
};


const addVendita = async (vendita) => {
    const response = await fetch(`${API_BASE_URL}/api/vendite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vendita)
    });
    if (response.ok) {
        const newVendita = await response.json();
        return new Vendita(newVendita.azienda, newVendita.privato, newVendita.prodotto, newVendita.quantità, newVendita.prezzoListino, newVendita.sconto, newVendita.data, newVendita.supporto, newVendita.funzionario, newVendita.manager);
    } else {
        throw new Error("Error adding vendita individual");
    }
};

const API = { getAziende, deleteAzienda, addAzienda, updateAzienda, getUsers, deleteUser, getPrivati, deletePrivato, addPrivato, getVendite, deleteVendita, addVendita, logIn,logOut,getUserById ,getUserByUsername };

export default API;