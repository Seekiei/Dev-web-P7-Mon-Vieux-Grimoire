const Book = require('../models/Book');
const fs = require('fs');


exports.getAllBook = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book); // j'extrait l'objet book du corps de la requête
    const book = new Book({ // crée une nouvelle instance de Book avec les propriétés de cet objet, ainsi qu'une URL d'image générée à partir des informations de la requête
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    book.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.getOneBook = (req, res, next) => {
    Book.findById(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(404).json({ error: 'Livre introuvable' });
        }
        res.status(200).json(book);
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getTopBook = (req, res, next) => {
    Book.find()
      .sort({ averageRating: -1 })
      .limit(3)
      .then((books) => {
        res.status(200).json(books);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};

exports.updateBook = (req, res, next) => {
    const book = req.file // vérifie si un fichier est attaché à la requête
      ? {
          ...JSON.parse(req.body.book), 
          imageUrl: `${req.protocol}://${req.get('host')}/images/${  // met à jour l'URL de l'image du livre en utilisant l'URL de l'hôte et le nom du fichier
            req.file.filename
          }`,
        }
      : { ...req.body };
  
    Book.updateOne({ _id: req.params.id }, { ...book, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Livre mis à jour !' }))
      .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then((book) => {
        if (book.imageUrl) { // verifie si le livre a une image associé
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {  // si c'est le cas elle supprime également le fichier d'image du système de fichiers en utilisant le module fs
            Book.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Book.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(500).json({ error }));
};

exports.rateBook = (req, res, next) => {
    const userId = req.body.userId; //  récupère l'ID de l'utilisateur  
    const rating = parseInt(req.body.rating); // et la note à partir du corps de la requête
  
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return res.status(400).json({ message: 'La note doit être entre 0 et 5.' });
    }
  
    Book.findOne({ _id: req.params.id })
      .then((book) => {
        if (!book) {
          return res.status(404).json({ message: 'Livre non trouvé.' });
        }
  
        const existingRating = book.ratings.find((rating) => rating.userId === userId); //  recherche dans la propriété ratings du livre s'il existe déjà une note avec le même userId que celui fourni dans la requête
  
        if (existingRating) {
          return res.status(400).json({ message: "Livre déja noté." });
        }
  
        book.ratings.push({ userId, grade: rating }); // Si aucune note existante n'est trouvée, cette instruction ajoute une nouvelle note dans la propriété ratings du livre. 
  
        book.save()
          .then(() => res.status(200).json(book))
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };