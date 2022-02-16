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

app.get("/test", (req, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    //console.log("-------------lg30--------", result);
    result.platforms;
    //console.log("--------lg32--------", result.platforms);
    // result.total;
    // console.log("--------lg34---------", result.total);
    const pushed = [];
    for (let i = 0; i < result.platforms.length; i++) {
      pushed.push(result.platforms[i].name);
    }

    response.render("home", { list: pushed, total: result.total });
  });
});

/*
app.get("/test", (req, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }
    const result = JSON.parse(body);
    result.platforms.name;
    result.total;

    response.render("home", { list: result.platforms[0].name, total: result.total });
  });
});
*/

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
