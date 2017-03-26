var elasticlunr = require('elasticlunr');
fs = require('fs');
var PouchDB = require('pouchdb');


fs.readFile('./example_index.json', function (err, data) {
  if (err) throw err;
  var indexDump = JSON.parse(data);
  //console.time('load')
  console.log('index loaded')
  index = elasticlunr.Index.load(indexDump)
 //console.log(index)
  
  var t0 = new Date().getTime();
  //elasticlunr.clearStopWords();
  (index.search("Beyonce married to"))
  var t1 = new Date().getTime();
  console.log("Searching took " + (t1 - t0) + " milliseconds.")

}); 
  
