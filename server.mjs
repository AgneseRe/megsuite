import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import { deleteAzienda, deleteUser, listAllAziende, listAllPrivati, listAllUsers, listAllVendite, addAzienda, updateAzienda } from "./dao.mjs";
import passport from "passport";
import LocalStrategy from 'passport-local';
import session from "express-session";
import { verificaUser } from "./dao.mjs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));
console.log(__dirname);
// console.log(__filename);

const PORT = process.env.PORT || 3000;
  
 
// Configurazione trasportatore nodemailer

const transporter = nodemailer.createTransport({
    host: 'smtps.aruba.it',
    secure: true,
    port: 465,
    auth: {
      user: 'megsuite@meg-italia.com',
      pass: 'Suite2024!',
    }
  });


const corsOptions = {
    origin: "https://megsuite.netlify.app", /* "https://www.meg-italia.com",   /* "http://localhost:5173", */
    credentials: true, 
    optionSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "pirla",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async function verify(username, password, done) {
    try {
        const user = await verificaUser(username, password);
        if (!user) {
            return done(null, false, { message: 'Username o password sbagliato.' });
        } else {
            return done(null, user);
        }
    } catch (error) {
        console.log("Errore durante la verifica dell'utente.", error);
        return done(error);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
app.delete('/api/sessions' ,(req,res)=>{
    req.logout(()=>res.end());
})
app.post('/api/sessions', function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
  
            return next(err);
        }
        if (!user) {
            console.log(" Autenticazione fallita.", info);
            return res.status(401).send(info);
        }
        req.login(user, (err) => {
            if (err) {
       
                return next(err);
            }
            return res.status(201).json(req.user);
        });
    })(req, res, next);
});
app.get('/api/sessions',(req,res)=>{
    if(req.isAuthenticated())
        res.json(req.user);
    else{
        res.status(401).json({error:"Non autenticato"})
    }
})
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({ error: 'Not authorized' });
    }
};

app.get('/api/users', (request, response) => {
    listAllUsers().then(users => response.json(users))
    .catch(() => response.status(500).end());
});

// DELETE api/users/10
app.delete('/api/users/:id', (request, response) => {
    const userIdToDelete = request.params.id;
    deleteUser(userIdToDelete)
    .then(() => response.status(200).end())
    .catch(() => response.status(500).end());
})


// app.get('/api/users', (req, res) => {
//     listAllUsers()
//         .then(users => res.json(users))
//         .catch(() => res.status(500).end());
// });
// app.get('/api/users/:id',(req,res)=>{
//     const searchId =req.params.id;
//     getUserById(searchId) 
//     .then(user=>res.json(user))
//         .catch(() => res.status(500).end());
// })
// app.get('/api/users/:username',(req,res)=>{
//     const searchUsername =req.params.username;
//     getUserByUsername(searchUsername) 
//     .then(user=>res.json(user))
//         .catch(() => res.status(500).end());
// })
// app.delete('/api/users/:id', (req, res) => {
//     const userIdToDelete = req.params.id;
//     deleteUser(userIdToDelete)
//         .then(() => res.status(200).end())
//         .catch(() => res.status(500).end());
// });

/* ********* AZIENDA *********** */
app.get('/api/aziende', (request, response) => {
    listAllAziende().then(aziende => response.json(aziende))
    .catch(() => response.status(500).end());
});

app.delete('/api/aziende/:id', (request, response) => {
    const aziendaIdToDelete = request.params.id;
    deleteAzienda(aziendaIdToDelete)
    .then(() => response.status(200).end())
    .catch(() => response.status(500).end());
});

app.post('/api/aziende', async (request, response) => {
    const newAzienda = request.body;
    const mailOptions = {
        from: 'megsuite@meg-italia.com',
        to: 'megsuite@meg-italia.com',
        subject: 'Registrazione azienda',
        text: `L'azienda ${newAzienda.ragioneSociale} è stata registrata. Accedi alla banca dati per visualizzare tutte le informazioni.`,
    };
    try {
        // id nuova azienda dato dal dao
        const id = await addAzienda(newAzienda);
        await transporter.sendMail(mailOptions);
        response.status(201).location(id).end();
    } catch(err) {
        console.error(`ERROR: ${err.message}`);
        response.status(503).json({error: 'Impossibile creare nuova azienda.'});
    }
});

app.put('/api/aziende/:id', async (request, response) => {
    const updatedAzienda = request.body;
    updatedAzienda.idAzienda = request.params.id;
    console.log(updatedAzienda);
    console.log(updatedAzienda.idAzienda);
    try {
        await updateAzienda(updatedAzienda);
        response.status(200).end();
    } catch(err) {
        console.error(`ERROR: ${err.message}`);
        response.status(503).json({error: 'Impossibile modificare azienda.'});
    }
});

/* ********* PRIVATI *********** */
app.get('/api/privati', (request, response) => {
    listAllPrivati().then(privati => response.json(privati))
    .catch(() => response.status(500).end());
});

app.delete('/api/aziende/:id', (request, response) => {
    const aziendaIdToDelete = request.params.id;
    deleteAzienda(aziendaIdToDelete)
    .then(() => response.status(200).end())
    .catch(() => response.status(500).end());
});
//VENDITE
app.get('/api/vendite', (request, response) => {
    listAllVendite().then(vendite => response.json(vendite))
    .catch(() => response.status(500).end());
});

app.delete('/api/vendite/:id', (request, response) => {
    const venditaIdToDelete = request.params.id;
    deleteAzienda(venditaIdToDelete)
    .then(() => response.status(200).end())
    .catch(() => response.status(500).end());
});

// DEFAULT
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Listen on port ${PORT}`));