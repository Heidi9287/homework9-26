const { Games, Players } = require("./db");

const express = require("express");
const app = express();

//----------- VIEW ALL  ----------

app.get("/players", async (req, res, next) => {
  const players = await Players.findAll({
    include: [Games],
  });
  res.send(`
      <body>
        <h1>RPS Game Players</h1>
            ${players
              .map(
                (players) => `
                    <div>
                        <p>${players.username}</p>
                        <p>${players.id}</p>
                    </div>
                `
              )
              .join("")}
      </body>
    `);
});

// ---------- SEE PLAYERS BY ID--------------
app.get("/players/:playerid", async (req, res, next) => {
  const players = await Players.findAll({
    include: [Games],
  });
  // const games = await Games.findAll({
  //   include: [Players],
  // });
  const playerId = req.params.id;
  console.log(playerId);
  res.send(`
 <body>
 <h1>RPS Game Players</h1>
  <p>${players}</p>

  </body>
      `);
});
// });

// // app.post("/bookmarks", async (req, res, next) => {
// //   const category = await Category.findAll({
// //     include: [Bookmark],
// //   });

// //   const bookmark = await Bookmark.findAll({
// //     include: [Category],
// //   });

//--------------------PORT----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
