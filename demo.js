"use strict";

var fs = require("fs");
var decoder = require("./src/index.js");

var imageData = fs.readFileSync("./images/img_1.jpg");

decoder(imageData);
