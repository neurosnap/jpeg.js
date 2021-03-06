"use strict";

var markers = {
  precursor: 0xff,
  // start of image marker
  soi: 0xd8,
  // end of image marker
  eoi: 0xd9,
};

console.log("PRECURSOR: " + markers.precursor);
console.log("START OF IMAGE: " + markers.soi);
console.log("END OF IMAGE: " + markers.eoi);

console.log("---");

function decode(imageData) {
  var cImageData = [];
  var getImageData = false;

  for (var i = 0; i < imageData.length; i++) {
    var pairByte = [
      imageData[i],
      (i + 1 < imageData.length) ? imageData[i + 1] : null
    ];

    if (!getImageData && soiMarkerFound(pairByte)) {
      console.log("FOUND SOI");
      getImageData = true;
      continue;
    }

    if (getImageData && eoiMarkerFound(pairByte)) {
      console.log("FOUND EOI");
      break;
    }

    if (getImageData) {
      cImageData.push(marker);
    }

    if (pairByte[0] != 0xff || pairByte[1] == 0xff || pairByte[1] == 0) {
      continue;
    }

    var marker = pairByte[1];
  }

  console.log(cImageData.length);
}

function soiMarkerFound(pairByte) {
  return (pairByte[0] == markers.precursor
          && pairByte[1] == markers.soi);
}

function eoiMarkerFound(pairByte) {
  return (pairByte[0] == markers.precursor
          && pairByte[1] == markers.eoi);
}

module.exports = decode;
