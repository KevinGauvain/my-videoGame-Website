import express from "express";
import nunjucks from "nunjucks";
import request from "@fewlines-education/request";

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("home");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

app.get("/platformList", (req, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    // console.log("-------------lg30--------", result);
    result.platforms;
    // console.log("--------lg32--------", result.platforms);
    // result.total;
    // console.log("--------lg34---------", result.total);
    // const listplatf = [];
    // const objectUrl = [];
    // for (let i = 0; i < result.platforms.length; i++) {
    //   listplatf.push(result.platforms[i].name);
    //   objectUrl.push(result.platforms[i].logo);
    //   console.log("------------lg40-----", listplatf);
    //   console.log("---------lg41---------", objectUrl);
    // }

    response.render("home", { list: result.platforms, total: result.total });
  });
});

app.get("/gameList/:platformId", (req, response) => {
  const platformId = req.params;
  // console.log(platformId);
  request(`http://videogame-api.fly.dev/games/platforms/${platformId.platformId}`, (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    // result.games;
    // result.total;
    // console.log(result.games);

    response.render("gameslistbyplatf", { list: result.games, total: result.total });
  });
});

app.get("/gameInformation/:gameId", (req, response) => {
  const gameId = req.params;
  // console.log(gameId);
  request(`http://videogame-api.fly.dev/games/${gameId.gameId}`, (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    // result.total;
    // console.log(result);

    response.render("gamesinfos", { list: result, total: result.total });
  });
});

// ex slug => Jérémy Jérem => jeremy-jerem ----- Jérémy & Jérém => jeremy-and-jerem ou jeremy-jerem

// brouillon
// -
// -
// -
// -
// -
// -
// -
// -
// -
// app.get("/platformList", (req, response) => {
//   request("http://videogame-api.fly.dev/games/platforms/", (error, body) => {
//     if (error) {
//       throw error;
//     }
//     const result = JSON.parse(body);
//     result.total;
//     console.log("-----lg55-------", result);

//     response.render("gameslistbyplatf", { list: result, total: result.total });
//   });
// });

/*
app.get("/random-joke", (req, response) => {
  // beware here, we don't want a naming conflict so we name the request `req`

  request("https://api.chucknorris.io/jokes/random", (error, body) => {
    if (error) {
      throw error;
    }
    const joke = JSON.parse(body);

    response.render("joke.njk", { joke: joke.value });
  });
});
*/
