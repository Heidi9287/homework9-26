const { Games, Players } = require("./db");

const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//----------- VIEW HOMEPAGE ----------

app.get("/", async (req, res, next) => {
  const players = await Players.findAll({
    include: [Games],
  });
  res.send(`<!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" href="/style.css" />
  </head>
      <body>
        <h1>RPS Games</h1>
        <div class='body'>
        <h2 class='players'>This site is in construction, but you can have a peep</h2>
        <button button class="buttons"><a href="/players"> ENTER </a></button>
      </div>
      </body>
      </html>
    `);
});
//----------- VIEW ALL PLAYERS ----------

app.get("/players", async (req, res, next) => {
  const players = await Players.findAll({
    include: [Games],
  });
  res.send(`<!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" href="/style.css" />
  </head>
      <body>
        <h1>RPS Games</h1>
        <div class='body'>
        <h2 class='players'>Players: </h2>
            ${players
              .map(
                (players) => `
                    <div>
                        <p class='names'><a href="/players/${players.id}">${players.username}</a></p>
                    </div>
                `
              )
              .join("")}
      </div>
      </body>
      </html>
    `);
});
// ---------- SEE GAME BY ID--------------
app.get("/game/:gameid", async (req, res, next) => {
  const games = await Games.findAll({
    include: [Players],
  });
  const gameId = req.params.gameid;
  console.log(gameId);
  res.send(` <!DOCTYPE html>
  <html>
  <head>
  <link rel="stylesheet" href="/style.css" />
  </head>
      <body>
        <h1>RPS Games</h1>
             
                    <div>
                    <p>The Player is: ${
                      games[gameId - 1].dataValues.playerName
                    }</p>
                        <p>The result is: ${
                          games[gameId - 1].dataValues.result
                        }</p>
                    </div>
                
      </body>
      </html>
    `);
});
// ---------- SEE PLAYERS BY ID--------------
app.get("/players/:playerid", async (req, res, next) => {
  const players = await Players.findAll({
    include: [Games],
  });
  const games = await Games.findAll({
    include: [Players],
  });
  const playerId = req.params.playerid;
  const filteredGames = games.filter(
    (game) => game.playerName === players[playerId - 1].dataValues.username
  );
  res.send(`<!DOCTYPE html>
  <html> 
  <head>
  <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
  <h1>RPS Games</h1>
  <div class="body">
  <h2 class="players">The Player is: </h2>
  <p class="content">${players[playerId - 1].dataValues.username}</p>
  ${filteredGames
    .map(
      (game) => `
          
              <h2 class="players">The winner is: </h2><p class="content">${game.dataValues.result}</p>
      `
    )
    .join("")}
    <input placeholder="enter a new username" class="update"> </input>
    <button class="buttons">Update Username</button>
    <button class="buttons"><a href="/" > Back to Home </a></button>
    <button class="buttons"><a href="/players"> Back to Players List</a></button>
    </div>
  </body>
  </html>
`);
});

//-----------------UPDATE THE USER-------------------
app.put("/players/:playerid", async (req, res, next) => {
  const foundPlayer = await Players.findByPk(+req.params.playerid);
  const newPlayer = await foundPlayer.update({
    username: "New Name",
  });
  res.send(newPlayer);
});

//--------------------PORT----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
