// le middleware "auth" permet de vérifier si l'utilisateur est authentifié avant de lui donner accès à certaines routes

const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {  // indique que les instructions suivantes seront exécutées dans un bloc "try" et que si une exception est levée, le bloc "catch" sera exécuté
       const token = req.headers.authorization.split(' ')[1]; // extrait le token d'authentification du header "Authorization" de la requête. Le header "Authorization" doit être de la forme "Bearer token"
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // je decode le token en appelant la methode verify de jwt, ensuite j'appele mon token ainsi que le token secret
       const userId = decodedToken.userId; // je récupere le userId en particulier, ensuite dans le token décoder je recupere la propriéte userid 
       req.auth = {
           userId: userId               // ajoute un objet "auth" à l'objet "req" qui contient l'identifiant de l'utilisateur
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
