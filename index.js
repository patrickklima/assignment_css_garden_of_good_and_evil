//EXPRESS APP
const express = require('express');
const app = express();
const port = process.env.PORT;

//EXPRESS-HANDLEBARS
var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BODY-PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//COOKIE-PARSER
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//MIDDLEWARE AND RESOURCES
app.use(express.static(`${__dirname}/public`));

// console.log(`${__dirname}/public`);

//ROUTES
app.get('/', (req, res) => {
  res.render('home', {
    morality: req.cookies.morality || '',
    color: req.cookies.color || '',
    food: req.cookies.food || ''
  });
});

app.post('/', (req, res) => {
  res.cookie("morality", req.body.morality);
  res.cookie("color", req.body.color);
  res.cookie("food", req.body.food);
  // console.log(req.cookies);
  res.redirect('/');
});  

app.post('/clear', (req, res) => {
  var toClear = req.body.clear;
  if (toClear === "all") {
    ["morality", "food", "color"].forEach(c => res.clearCookie(c));
  } else {
    res.clearCookie(toClear);
  }
  // console.log(`cookies cleared: ${toClear}`);
  res.redirect('/');
});  


app.listen(port, () => {
  console.log(`listening on ${port}`);
});

