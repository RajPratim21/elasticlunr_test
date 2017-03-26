var elasticlunr = require('elasticlunr'),
    fs = require('fs');

var PouchDB = require('pouchdb');
db = new PouchDB('My index DB')
var idx = elasticlunr(function () {
  this.setRef('_id');
  this.addField('context')
  //this.addField('title');
  
});
var i=0;
fs.readFile('./train-v1.1.json', function (err, data) {
  if (err) throw err;

  var raw = JSON.parse(data);
  var questions = raw.data.map(function (q) {
   i = i+1;
      ans = q.paragraphs.map(function(r){
        //console.log(r.context)
          return {
            context: (r.context)
          }
      });
   
    return {
      id: i.toString(),
      title: q.title,
      context: JSON.parse(JSON.stringify(ans)),
    };
  });
var i=0, j=0,k=0;
var jsonArr = [];
var jsonDataArr = [];
  for(i=1;i<questions.length;i++)
  {
    for(j=1;j<questions[i].context.length;j++)
    {
      k++;
      jsonArr.push({
        _id: k.toString(),
        context: questions[i].context[j].context
    });
    }
  }
  index_data = jsonArr;
  

added_DB_file(function(flag){

    update_index_file(function(doc){
    idx.addDoc(doc);
    //console.log(idx);
    fs.writeFile('./example_index_pouchDB.json', JSON.stringify(idx), function (err) {
        if (err) throw err;
        //console.log('done writing ');
    })
    });
    
    
    

});

function added_DB_file(callback){
  var flag = 0
  //console.log('exec first')
  db.bulkDocs(jsonArr).then(function (result) {
      console.log('done addition of data')
       flag = 1;
 }).catch(function (err) {
   console.log(err);
  })
    setTimeout(function(){
        callback(flag);
    }, 3000);

}


function update_index_file(callback){

  for(i=1;i<1000;i++)
    db.get(i.toString()).then(function (doc) {
       jsonDataArr.push(doc);
       //console.log(doc)
       
       callback(doc);
  })
    console.log('done reading from DB')
    

}
var i =1;
  //console.log(idx)
   


});




  
