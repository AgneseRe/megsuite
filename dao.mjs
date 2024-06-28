import sqlite from "sqlite3";
import User from "./User.js";
import Azienda from "./Azienda.js";
import Privato from "./Privato.js";
import Vendita from "./Vendita.js";

const db = new sqlite.Database("megsuite.db", (err) => {
    if (err) throw err;
});

export const listAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                const users = rows.map((user) => new User(user.idUser, user.username, user.password, user.ruolo, user.nome, user.cognome, user.email, user.telefono));
                resolve(users);
            }
        });
    });
}


export const getUserById=(id)=>{
    return new Promise((resolve,reject)=>{
        const sql ="SELECT * FROM users WHERE idUser=?";
        db.get(sql,[id],(err,row)=>{
            if (err) {
                reject(err);
            }
            else {
                const user = new User(row.idUser, row.username, row.password, row.ruolo, row.nome, row.cognome, row.email, row.telefono);
                resolve(user);
            }
        })
    })
}
export const getUserByUsername=(username)=>{
    return new Promise((resolve,reject)=>{
        const sql ="SELECT * FROM users WHERE username=?";
        db.get(sql,[username],(err,row)=>{
            if (err) {
                reject(err);
            }
            else {
                const user = new User(row.idUser, row.username, row.password, row.ruolo, row.nome, row.cognome, row.email, row.telefono);
                resolve(user);
            }
        })
    })
}
export const verificaUser=(username,password)=>{
    return new Promise((resolve, reject) => {
        const sql="SELECT * FROM users WHERE username=?";
        db.get(sql,[username],(err,row)=>{
            if(err){
            
                reject(err);
               
             
            }else if(row===undefined){
       
                resolve(false);
     
             
            }else{
                const user={idUser:row.idUser,username:row.username,ruolo:row.ruolo,nome:row.nome,cognome:row.cognome,email:row.email,telefono:row.telefono};
                const passworddb=row.password;
                if(passworddb!==password){
                   
                    resolve(false);
               
                }else{
                    resolve(user)
                }
            }//cryptare il password
                
            });
        
        
    });
}
/* ********* AZIENDA *********** */
/* INSERT */
export const addAzienda = (azienda) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO aziende (ragioneSociale,settore,indirizzo,comune,provincia,regione,email,email2,telefono,sitoWeb,sdi,note) VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ";
        db.run(sql, [azienda.ragioneSociale, azienda.settore,azienda.indirizzo, azienda.comune, azienda.provincia, azienda.regione, azienda.email, azienda.email2, azienda.telefono,  azienda.sitoWeb, azienda.sdi,azienda.note],
            function (err) {
                if (err) {
                    reject(err);
                }
                else
                    resolve(this.lastID);
        });       
    });
};

/* UPDATE */
export const updateAzienda = (azienda) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE aziende SET ragioneSociale=?,settore=?,indirizzo=?,comune=?,provincia=?,regione=?,email=?,email2=?,telefono=?,sitoWeb=?,sdi=?,note=? WHERE idAzienda=?";
        db.run(sql, [azienda.ragioneSociale, azienda.settore,azienda.indirizzo, azienda.comune, azienda.provincia, azienda.regione, azienda.email, azienda.email2, azienda.telefono,  azienda.sitoWeb, azienda.sdi,azienda.note, azienda.idAzienda],
            function(err) {
                if(err) {
                    reject(err);
                }
                else
                    resolve(this.lastID);
            });
    });
};

/* DELETE */
export const deleteAzienda = (aziendaId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM aziende WHERE idAzienda = ?";
        db.run(sql, [aziendaId],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                    resolve();
        });
        
    });
};

/* SELECT */
export const listAllAziende = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM aziende ORDER BY ragioneSociale";
        db.all(sql, [], (err, rows) => {
            if(err)
                throw err;
            else {
                const aziende = rows.map((azienda) => new Azienda(azienda.idAzienda, azienda.ragioneSociale, azienda.settore, azienda.indirizzo, azienda.comune,
                    azienda.provincia, azienda.regione, azienda.email, azienda.email2, azienda.telefono, azienda.sitoWeb, azienda.sdi, azienda.note));
                resolve(aziende);
            }
        });
    });
}


//GUEST
//inserimento
export const addGuest = (guest) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO guest (username,password,nome,cognome,email,telefono) VALUES(?,?,?,?,?,?) ";
        db.run(sql, [guest.username, guest.password, guest.nome, guest.cognome, guest.email, guest.telefono],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                resolve(this.lastID);
        });
        
    });
};
// delete 
export const deleteGuest = (guestId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM azienda WHERE idAzienda =?  ";
        db.run(sql, [guestId],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                resolve(this.lastID);
        });
        
    });
};

//PRIVATO
//inserimento
export const addPrivato = (privato) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO privato (nome,cognome,indirizzo,comune,provincia,regione,codiceFiscale,email,telefono,note) VALUES(?,?,?,?,?,?,?,?,?,?) ";
        db.run(sql, [privato.nome, privato.cognome, privato.indirizzo, privato.comune, privato.provincia, privato.regione, privato.codiceFiscale, privato.email, privato.telefono, privato.note],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                resolve(this.lastID);
        });
        
    });
};
// delete 
export const deletePrivato = (privatoId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM privato WHERE idPrivato =?  ";
        db.run(sql, [privatoId],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                resolve(this.lastID);
        });
        
    });
};
//select
export const listAllPrivati = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM privati ORDER BY idPrivato";
        db.all(sql, [], (err, rows) => {
            if(err)
                throw err;
            else {
                const privati = rows.map((privato) => new Privato(privato.idPrivato, privato.nome, privato.cognome, privato.indirizzo, privato.comune, privato.provincia, privato.regione, privato.codiceFiscale, privato.email, privato.telefono, privato.note));
                resolve(privati);
            }
        });
    });
}
//PRODOTTO
//inserimento
export const addProdotto = (prodotto) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO prodotto (nome,visibiltà,prezzo,categoria) VALUES(?,?,?,?) ";
        db.run(sql, [prodotto.nome, prodotto.visibilità, prodotto.prezzo, prodotto.categoria],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                resolve(this.lastID);
        });
        
    });
};
// delete 
export const deleteProdotto = (prodottoId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM prodotto WHERE idProdotto =?  ";
        db.run(sql, [prodottoId],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                resolve(this.lastID);
        });
        
    });
};
// USER 
    // inserimento
export const addUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO user (username,password,ruolo,nome,cognome,email,telefono) VALUES(?,?,?,?,?,?,?) ";
        db.run(sql, [user.username, user.password, user.ruolo, user.nome, user.cognome, user.email, user.telefono],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                    resolve(this.lastID);
            });

    });
};
// delete 
export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM user WHERE idUser =?  ";
        db.run(sql, [userId],
            function (err) {
                if (err) {
                    throw err;
                }
                else
                    resolve(this.lastID);
            });

    });
};
// VENDITA
//select
export const listAllVendite = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM vendite ORDER BY idVendita";
        db.all(sql, [], (err, rows) => {
            if(err)
                throw err;
            else {
                const vendite = rows.map((vendita) => new Vendita(vendita.tipologiaCliente, vendita.prodotto, vendita.quantità, vendita.prezzoListino, vendita.sconto, vendita.data, vendita.supporto, vendita.funzionario, vendita.manager));
                resolve(vendite);
            }
        });
    });
}
    // inserimento
    export const addVendita = (vendita) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO vendita (azienda,privato,prodotto,quantità,prezzoListino,sconto,data,supporto,funzionario,manager) VALUES(?,?,?,?,?,?,?,?,?,?) ";
            db.run(sql, [vendita.tipologiaCliente, vendita.prodotto, vendita.quantità, vendita.prezzoListino, vendita.sconto, vendita.data, vendita.supporto, vendita.funzionario, vendita.manager],
                function (err) {
                    if (err) {
                        throw err;
                    }
                    else
                        resolve(this.lastID);
                });
    
        });
    };
    // delete 
    export const deleteVendita = (venditaId) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM vendita WHERE idVendita =?  ";
            db.run(sql, [venditaId],
                function (err) {
                    if (err) {
                        throw err;
                    }
                    else
                        resolve(this.lastID);
                });
    
        });
    };
//update
    // export const updateVendita = (venditaId) => {
    //     return new Promise((resolve, reject) => {
    //         const sql = "UPDATE vendita SET azienda = ? ,privato = ? ,prodotto = ? ,quantità = ? ,prezzoListino = ? ,sconto = ? ,data = ? ,supporto = ? ,funzionario = ? ,manager = ?   ";
    //         db.run(sql, [venditaId],
    //             function (err) {
    //                 if (err) {
    //                     throw err;
    //                 }
    //                 else
    //                     resolve(this.lastID);
    //             });
    
    //     });
    // };
//update
    export const updateVendita = (vendita) => {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE vendita
                SET azienda = ?, 
                    privato = ?, 
                    prodotto = ?, 
                    quantità = ?, 
                    prezzoListino = ?, 
                    sconto = ?, 
                    data = ?, 
                    supporto = ?, 
                    funzionario = ?, 
                    manager = ?
                WHERE id = ?
            `;
            db.run(sql, [vendita.azienda,vendita.privato,vendita.prodotto,vendita.quantità,vendita.prezzoListino,vendita.sconto,vendita.data,vendita.supporto,vendita.funzionario,vendita.manager,vendita.id ],
                 function (err) {
                if (err) {
                    reject(err); 
                } else {
                    resolve(this.lastID); 
                }
            });
        });
    };