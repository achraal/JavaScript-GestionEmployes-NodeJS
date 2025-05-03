const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'gestion_employes' 
});

// Connexion à la base de données
db.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Routes CRUD
// Créer un employé
app.post('/employes', (req, res) => {
    const { nom, email, poste, salaire, telephone } = req.body;
    const sql = 'INSERT INTO employes (nom, email, poste, salaire, telephone) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nom, email, poste, salaire, telephone], (err, result) => {
        if (err) throw err;
        res.send('Employé ajouté avec succès');
    });
});

// Lire tous les employés
app.get('/employes', (req, res) => {
    const sql = 'SELECT * FROM employes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Mettre à jour un employé
app.put('/employes/:id', (req, res) => {
    const { id } = req.params;
    const { nom, email, poste, salaire, telephone } = req.body;
    const sql = 'UPDATE employes SET nom = ?, email = ?, poste = ?, salaire = ?, telephone = ? WHERE id = ?';
    db.query(sql, [nom, email, poste, salaire, telephone, id], (err, result) => {
        if (err) throw err;
        res.send('Employé mis à jour avec succès');
    });
});

// Supprimer un employé
app.delete('/employes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Employé supprimé avec succès');
    });
});

// Supprimer tous les employés
app.delete('/employes', (req, res) => {
    const sql = 'DELETE FROM employes';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Tous les employés ont été supprimés avec succès');
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});