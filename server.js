const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// route to static content
// app.use(express.static(process.cwd() + '/'));

// route to static content if using bundler?
app.use('/dist', express.static('dist'));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listener
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});