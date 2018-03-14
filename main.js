const express = require('express');
const exphbs  = require('express-handlebars');
const mongo = require('mongodb');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const url = "mongodb://localhost:27017/";

mongo.MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("essec");
  

    app.use(express.static('static'))

    app.get('/help', (req, res) => res.send('Coding is hard!'));

    app.get('/students/:age', (req, res) => {
        dbo.collection("students").find({age:{$gt:parseInt(req.params.age)}}).toArray(function(err, result) {
            if (err) throw err;
            res.render('students',{students:result});
          });
    });

    app.get('/', (req, res) => res.send('Hello World!'));

    app.listen(3000, () => console.log('Example app listening on port 3000!'));

});


