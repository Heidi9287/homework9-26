const Sequelize = require("sequelize");

const DB_URL = process.env.DB_URL || "postgres://localhost:5432/rpsgame";
const db = new Sequelize(DB_URL);
const Games = db.define("games", {
  result: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  playerName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Players = db.define("players", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Players.hasMany(Games);
Games.belongsTo(Players);

module.exports = {
  db,
  Games,
  Players,
};
