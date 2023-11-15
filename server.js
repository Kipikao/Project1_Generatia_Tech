import express from "express";
import routerQtn from "./routers/questions.js";
import morgan from "morgan";
import mongoose from "mongoose";
import Qtn from "./model/qtn.js";
import dotenv from "dotenv";
dotenv.config();

// express app
let app = express();

//connect to mongoDB
const dbURI = process.env.MONGOURI;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

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
