const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => { // exportation de la fonction nommée "signup" qui prend les paramètres "req", "res" et "next". Cette fonction va gérer la création d'un nouvel utilisateur
    bcrypt.hash(req.body.password, 10) // utilise la fonction "bcrypt.hash" pour hasher le mot de passe envoyé dans la requête "req.body.password" le mot de passe va étre hasher 10 fois pour renforcer la sécurité
    .then(hash => { //  création d'un nouvel objet "User" avec l'adresse email de l'utilisateur et le mot de passe haché généré à l'étape précédente
       const user = new User({
        email: req.body.email,
        password: hash
       });
       user.save() // enregistrement de l'utilisateur dans la base de données en utilisant la méthode "save()" qui retourne une promesse :
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ message: 'erreur interne du serveur', error })); // Si une erreur survient (ex: problème de connexion avec la base de données), renvoie une réponse avec le code de statut HTTP 500 (erreur interne du serveur) et l'erreur
};

exports.login = (req, res, next) => { // exportation de la fonction nommée "login" qui prend les paramètres "req", "res" et "next". Cette fonction va gérer l'authentification d'un utilisateur existan
    User.findOne({ email: req.body.email }) // utilise la méthode "findOne()" pour chercher l'utilisateur avec l'adresse email envoyée dans la requête "req.body.email
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur introuvable'});
            }
            bcrypt.compare(req.body.password, user.password) // Si l'utilisateur existe, il utilise la fonction "bcrypt.compare" pour comparer le mot de passe envoyé dans la requête "req.body.password" avec le mot de passe haché de l'utilisateur
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Login/mot de passe incorrecte' });
                    }
                    res.status(200).json({ // un objet JSON contenant l'identifiant et le token de l'utilisateur généré avec la fonction "jwt.sign" Ce jeton est valable pendant 24 heures
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error })); // Si une erreur survient (ex: problème de connexion avec la base de données), on renvoie une réponse avec le code de statut HTTP 500 (erreur interne du serveur) et l'erreur
        })
        .catch(error => res.status(500).json({ error }));
};