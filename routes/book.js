// les routes HTTP pour les ressources des livres
const express = require('express');
const router = express.Router();

// chargent les middlewares auth et multer pour authentifier les requêtes et gérer les fichiers téléchargés
const auth = require('../middleware/auth') 
const multer = require('../middleware/multer-config')

const bookCtrl = require('../controllers/book');  // contient les fonctions de contrôleur pour les routes de livre

router.get('/bestrating', bookCtrl.getTopBook); // la route pour récupérer les livres avec la meilleure note en appelant la fonction getTopBook
router.get('/', bookCtrl.getAllBook); // la route pour récupérer tous les livres en appelant la fonction getAllBook
router.post('/', auth, multer, bookCtrl.createBook) // ula route pour créer un nouveau livre en appelant la fonction createBook tout en appliquant les middlewares auth et multer
router.delete('/:id', auth, bookCtrl.deleteBook); // la route pour supprimer un livre en appelant la fonction deleteBook en appliquant le middleware auth
router.get('/:id', bookCtrl.getOneBook); //  la route pour récupérer un livre par l'id de l'utilisateur en appelant la fonction getOneBook
router.put('/:id', multer, bookCtrl.updateBook); // la route pour mettre à jour un livre en appelant la fonction updateBook en appliquant les middlewares auth et multer
router.post('/:id/rating', auth, bookCtrl.rateBook); // la route pour ajouter une note à un livre spécifique en appelant la fonction rateBook en appliquant le middleware auth

module.exports = router;  // exporte l'objet router pour être utilisé dans le script app.js



// Les routes définies dans ce fichier seront disponibles via l'URI :
// /api/books/bestrating, /api/books/, /api/books/:id, /api/books/:id/rating. Les routes /api/books/ et /api/books/:id prennent en charge les méthodes HTTP GET, POST, DELETE et PUT.