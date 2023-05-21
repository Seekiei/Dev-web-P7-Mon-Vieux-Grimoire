const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// le schéma de données pour la collection "user" de la base de données MongoDB
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // j'utilise uniqueValidator pour m'assurer que l'email est unique dans la collection

module.exports = mongoose.model('user', userSchema); // exporte le modèle user en utilisant la méthode mongoose.model()