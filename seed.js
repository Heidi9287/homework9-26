const { db, Games, Players } = require("./db");

const seedDb = async () => {
  //connects to your db
  //clears everything out
  await db.sync({ force: true, logging: false });

  const harry = await Players.create({
    username: "Harry",
  });

  const ron = await Players.create({
    username: "Ron",
  });

  const hermione = await Players.create({
    username: "Hermione",
  });

  await Games.create({
    result: "human",
    playerName: harry.username,
  });

  await Games.create({
    result: "computer",
    playerName: ron.username,
  });

  await Games.create({
    result: "tie",
    playerName: hermione.username,
  });

  //   console.log((await Players.findAll()).map((players) => players.username));
  //   console.log((await Games.findAll()).map((games) => games.playerName));
};

seedDb();
