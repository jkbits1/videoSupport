/**
 * Created by jk on 27/12/15.
 */

var getVideoDiscover = require('./vidDiscover');

var fileName = process.argv[2];

getVideoDiscover(fileName, function (titleDetails) {
  console.log(titleDetails);
});
