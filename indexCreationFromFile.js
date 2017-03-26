var elasticlunr = require('elasticlunr'),
    fs = require('fs');

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
 //console.log(index_data)
  jsonArr.forEach(function (data) {
  //console.log(data)
    //elasticlunr.clearStopWords()
    idx.addDoc(data);
      
  });
    fs.writeFile('./example_index.json', JSON.stringify(idx), function (err) {
    if (err) throw err;
    console.log('done writing ');

  });
});


  
