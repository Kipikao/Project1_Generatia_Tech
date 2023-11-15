import express from "express";
const routerQtn = express.Router();
import Qtn from "../model/qtn.js";
import multer from "multer";
const qtnFile = multer({ dest: "public/qtnFile/" });
const uploadFile = qtnFile.fields([{name: 'carRegistration', maxCount: 1}, {name: 'imgError', maxCount: 3}]);


routerQtn.get("/add", (req, res) => {
  res.render("addQtn");
});

routerQtn.post("/add",uploadFile , async function(req, res){
// req.file

  const add_qtn = new Qtn(req.body);
  await add_qtn
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

routerQtn.get("/view/:id", async (req, res) => {
  const qtn = await Qtn.findById(req.params.id);
  res.render("singelQtn", { qtn });
});

routerQtn.get("/edit/:id", async (req, res) => {
  const qtn = await Qtn.findById(req.params.id);
  res.render("editQtn", { qtn });
});

routerQtn.post("/edit/:id", async (req, res) => {
  await Qtn.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    aboutCar: req.body.aboutCar,
    carRegistration: req.body.carRegistration,
    descriptionCategori: req.body.descriptionCategori,
    summaryQtn: req.body.summaryQtn,
    detailProblem: req.body.detailProblem,
    imgError: req.body.imgError,
    termAndCondition: req.body.termAndCondition,
    confidential: req.body.confidential,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

routerQtn.get("/admin", async (req, res) => {
  const qtn = await Qtn.find()
    .sort({ createdAt: -1 })
    .catch((err) => {
      console.log(err);
    });
  res.render("admin", { qtns: qtn });
});

routerQtn.get("/answer/:id", async (req, res) => {
  const qtn_id = await Qtn.findById(req.params.id);
  const qtn = await Qtn.find()
    .sort({ createdAt: -1 })
    .catch((err) => {
      console.log(err);
    });
  res.render("answerQtn", { qtn: qtn_id, qtns: qtn });
});

routerQtn.post("/answer/:id", async (req, res) => {
  // console.log(Qtn.find(id));
  await Qtn.findOneAndUpdate(
    { _id: req.params.id },
    {
      answer: req.body.answer,
    }
  ).catch((err) => {
    console.log(err);
  });
  res.redirect("/qtn/admin");
});

routerQtn.post("/admin/:id", async (req, res) => {
  console.log(req.params.id);
  const delId = await Qtn.findByIdAndDelete({ _id: req.params.id }).catch(
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/qtn/admin");
});

export default routerQtn;
