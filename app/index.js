// index.js
const path = require('path')
const express = require('express')
//const exphbs = require('express-handlebars')
const ejs = require('ejs')
const app = express()

/*var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodedb"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
}); 
*/

const rp = require('request-promise')

app.set('views', __dirname + '/views/layouts/');

// set the view engine to ejs
app.set('view engine', 'ejs');
/*app.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.ejs')
app.set('views', path.join(__dirname, 'views'))*/

app.get('/', (request, response) => {
  response.render('home', {
    name: 'Jaymin',
    introduction: 'My name is jaymin and I am 21 years old',
  })
})

app.get('/home', (request, response) => {
  response.render('home', {
    name: 'Vikas',
    introduction: 'My name is vikas and I am 23 years old',
  })
})

app.get('/:city', (req, res) => {
  rp({
    uri: 'https://api.birdeye.com/resources/v1/business/child/all',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  	},
    qs: {
      pid: '147829593033582',
      api_key: '8zN9rxK0a5tw69UYZnUl3VrfKNoVj2NS'
    },
    json: true
  })
    .then((data) => {
      console.log(data)
      //res.render('home', data)
      res.render('home', {
                data:  data
            });
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})


app.listen(3001)