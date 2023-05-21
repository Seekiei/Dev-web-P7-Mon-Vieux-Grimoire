const mongoose = require('mongoose');

// Le modèle de données est défini à l'aide de la méthode mongoose.Schema() qui prend en argument un objet définissant les propriétés du schéma
const bookSchema = mongoose.Schema({
  userId: { type: String }, // identifiant de l'utilisateur qui a créé le livre
  title: { type: String }, // titre du livre
  author: { type: String }, // nom de l'auteur du livre
  imageUrl: { type: String }, // URL de l'image de couverture du livre
  year: { type: Number }, // année de publication du livre
  genre: { type: String }, // genre du livre
  ratings: [ //  tableau contenant les évaluations du livre, chaque évaluation étant elle-même un objet avec deux propriétés : userId et grade (note sur 5)
    {
        userId: { type: String },
        grade: { type: Number } 
    }
  ],
  averageRating: { type: Number } // note moyenne du livre, calculée à partir des évaluations
});

module.exports = mongoose.model('Book', bookSchema);