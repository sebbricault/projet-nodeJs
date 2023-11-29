const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (req, res, next) => {
  //en-tête jetton envoyer utilisateur
  const authorizationHeader = req.headers.authorization;
  // on verifie que le jetton à bien été fourni
  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }
  // recupération du jetton
  const token = authorizationHeader.split(" ")[1];
  // verifie le jetton
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
      return res.status(401).json({ message, data: error });
    }
    // jetton valide ou d'un autre utilisateur
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      return res.status(401).json({ message });
    } else {
      // sinon peut accéder au point demandé
      next();
    }
  });
};
