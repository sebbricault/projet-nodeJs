const express = require("express");
// const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const app = express();
const port = process.env.PORT || 3306;
app.use(bodyParser.json());
app.use(favicon(__dirname + "/favicon.ico"));
// use(morgan("dev"));
sequelize.initDb();
// ici, nous placerons futurs point de terminaison
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);
// la gestion des erreurs
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  );
});
