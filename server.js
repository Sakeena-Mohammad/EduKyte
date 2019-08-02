const model = require("./client/src/db_model/file_path_model");
const uploadPath = "F:/DIGICHORUS/React_File_Upload/client/public/uploads";
const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const filepath = mongoose.model("filepath");
const app = express();
const bodyParser = require("body-parser");
const file_schema = require("./client/src/db_model/file_path_model").file;
app.use(fileUpload());

mongoose.connect(
  "mongodb://localhost:27017/file_path_uploads",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

// Uploading the file to the location and storing its path and name in mongodb
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  //uploading file to location
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.log("Error in uploading");
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    //storing the details in mongodb
    var fileDetails = new filepath();
    fileDetails.filename = file.name;
    fileDetails.filepath = uploadPath;
    fileDetails.save((err, res) => {
      if (err) {
        console.log("mongo error while saving");
      } else {
        console.log(res);
      }
    });
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Retriveing path of given file name
app.post("/retrive", (req, res) => {
  model.findOne({ filename: req.body.filename }).exec((err, data) => {
    if (err) {
      res.send("error has occured");
    } else {
      const name = data.filename;
      const path = data.filepath;
      res.json({ name: name, path: path });
    }
  });
});
app.listen(5000, () => console.log("Server Started..."));
