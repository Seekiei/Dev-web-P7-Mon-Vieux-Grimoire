const multer = require('multer');

const MIME_TYPES = { // je définit un objet MIME_TYPES qui contient les types MIME autorisés pour les images et leur extension respective
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // utilisation de la fonction de multer diskStorage() pour enregistrer les fichiers sur le disk
  destination: (req, file, callback) => { 
    callback(null, 'images'); // la fonction destination indique que les fichiers doivent être stockés dans le dossier images
  },
  filename: (req, file, callback) => { // Dans la fonction filename,je crée un nom unique pour chaque fichier
    const name = file.originalname.split(' ').join('_'); // remplaçant les espaces dans le nom d'origine par des underscores 
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension); // en ajoutant la date courante et en ajoutant l'extension correspondante à son type MIME
  }
});

module.exports = multer({storage: storage}).single('image'); //  exporte l'objet multer configuré avec storage et la méthode .single() qui permet de gérer un seul fichier à la fois