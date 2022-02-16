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
    result.platforms.name;
    result.total;

    response.render("home", { liste: result.platforms[0].name, total: result.total });
  });
});

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
