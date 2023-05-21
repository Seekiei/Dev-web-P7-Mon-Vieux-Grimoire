const http = require('http');
const app = require('./app');

const normalizePort = val => {  // cette fonction "normalizePort" qui prend en argument un port et le convertit en un nombre entier la fonction est utilisée pour normaliser le port fourni par l'environnement de production 
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000'); // la variable "port" est initialisée en appelant la fonction "normalizePort" sur le port fourni par l'environnement ou en utilisant le port 3000 si aucun port n'est fourni
app.set('port', port); // je defenit le port sur lequel le server va écouter

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);  //  la variable "server" est initialisée en appelant la fonction "createServer" du module HTTP avec l'application express en tant que paramètre

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
}); 

server.listen(port);  //  le serveur est mis en écoute sur le port spécifié