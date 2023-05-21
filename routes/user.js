const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');  // charge le module userCtrl, qui contient les fonctions de contrôleur pour les routes utilisateur

//  les routes pour l'inscription et la connexion de l'utilisateur en appelant les fonctions de contrôleur correspondantes

router.post('/signup', userCtrl.signup); // La route /signup est définie pour la méthode HTTP POST et appelle la fonction signup du controllers user pour créer un nouvel utilisateur dans la base de données
router.post('/login', userCtrl.login); //  La route /login est également définie pour la méthode HTTP POST et appelle la fonction login du contrôleur utilisateur pour authentifier un utilisateur existant

module.exports = router;