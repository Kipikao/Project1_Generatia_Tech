import express from "express";
import routerQtn from "./routers/questions.js";
import morgan from "morgan";
import mongoose from "mongoose";
import Qtn from "./model/qtn.js";
// const Qtn = require("./model/qtn")

// express app
let app = express();

//connect to mongoDB
const dbURI =
 
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// const qtn = {
//   descriptionCategori: "mecanica",
//   summaryQtn: `xLorem ipsum dolor sit amet, consectetur `,
//   detailProblem: `xLorem ipsum dolor sit amet, consectetur
//    adipisicing elit. Ex, esse. Voluptates fuga inventore ullam quo nemo?
//     Sed labore, totam, voluptatum ea at cumque sapiente nesciunt reiciendis
//     fugit asperiores quo eligendi.`,
// };

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const qtn = await Qtn.find()
    .sort({ createdAt: -1 })
    .catch((err) => {
      console.log(err);
    });

  res.render("index", { qtns: qtn });
});

app.use("/qtn", routerQtn);

app.use((req, res) => {
  res.status(404).render("404");
});

// app.listen(3000);
