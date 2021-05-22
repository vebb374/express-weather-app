const express = require("express");
const app = express();
const axios = require("axios");
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
app.use(express.json());
PORT = process.env.PORT || 3000;
app.use(express.static("./public"));

app.post("/weather", (req, res) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.API_KEY}&units=metric`;

  axios({
    url: url,
    responseType: "json",
  })
    .then((data) => {
      res.json(data.data);
      console.log(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`app started on port :${PORT}`);
});
