/**
 * Created by jk on 20/12/15.
 */

// iife wrapper
(function () {
  var fs = require('fs');

  var fileName = process.argv[2];

  console.log(fileName);

  fs.readFile(fileName, function (err, data) {
    var fileData = [], titleLengths = [], titleDetails = [];
    if (err) {
      throw err;
    }

    fileData = data.toString().split('\n');

    //console.log(fileData);

    titleLengths = fileData.reduce(function (prev, val) {
      var re = /(ID_DVD_TITLE_\d+_LENGTH=\d+(\.\d+))/i;
      var found = val.match(re);

      if (found !== undefined && found !== null) {
        //console.log(found);

        prev.push(found[0]);
      }

      return prev;
    }, []);

    //console.log(titleLengths);

    titleDetails = titleLengths.map(function (val) {
      var titleNumber = 0;
      var length = 0;

      var regTitleNumberPortion = /(ID_DVD_TITLE_\d+)/i;
      var found = val.match(regTitleNumberPortion);

      if (found !== undefined && found !== null) {
        var regTitleNumber = /\d+/i;
        var numInfo = found[0].match(regTitleNumber);

        //console.log(numInfo);

        titleNumber = numInfo[0];

        var regLengthPortion = /LENGTH=\d+(\.\d+)/i;
        var lengthInfo = val.match(regLengthPortion);

        //console.log(val);
        //console.log("len: " + lengthInfo);

        length = lengthInfo[0].match(/\d+(\.\d+)/) [0];
      }

      return {
        line: val,
        titleNumber: +(titleNumber),
        length: +(length)
      };
    });

    //console.log(titleDetails);

    titleDetails.sort(function (title1, title2) {
      return title1.length - title2.length;
    });

    console.log(titleDetails);

  });
})();