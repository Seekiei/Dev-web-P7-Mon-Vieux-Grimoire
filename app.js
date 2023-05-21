const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const connectionString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_OPTIONS}`; // crée une chaîne de connexion à MongoDB en utilisant les variables d'environnement définies dans le fichier .env
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book')  // charge les modules de routage pour les ressources user et book

mongoose.connect(connectionString, {
  useNewUrlParser: true,  // j'établit une connexion à la base de données MongoDB en utilisant la chaîne de connexion définie précédemment
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use(express.json());

app.use((req, res, next) => { // les en-têtes CORS pour permettre les requêtes cross-domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', bookRoutes);  // les routes pour les ressources book, user et pour servir des fichiers statiques
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;  // exportation de l'application Express pour être utilisée dans le script serveur: 