const { Sequelize, DataTypes } = require("sequelize");
let pokemons = require("./mock-pockemon.js");
const PokemonModel = require("../models/pokemon.js");
const UserModel = require("../models/user.js");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "root", {
  host: "localhost",
  dialect: "mariadb",
  port: 8889,
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: (msg) => console.log(msg),
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const initDb = () => {
  sequelize.sync({ force: true }).then((_) => {
    console.log("La base de données 'Pokédex 'a bien été synchronisée.");
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((bulbizzare) => console.log(bulbizzare.toJSON()));
    });
    // le mdp et le nombre entier de delais d'encryptage
    bcrypt
      .hash("pikachu", 10)
      .then((hash) =>
        User.create({
          username: "pikachu",
          password: hash,
        })
      )
      .then((user) => console.log(user.toJSON()));
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
