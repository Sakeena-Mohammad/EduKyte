const mongoose = require("mongoose");

var file = new mongoose.Schema({
  filename: {
    type: String
  },
  filepath: {
    type: String
  }
});

module.exports = mongoose.model("filepath", file);
