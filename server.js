const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const DIST_DIR = __dirname;
// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({
//   type: 'application/vnd.api+json'
// }));

// route to static content
// app.use(express.static(process.cwd() + '/'));

// route to static content if using bundler?
console.log('path', path.join(DIST_DIR, 'public'))
console.log('path2', path.join(DIST_DIR, 'dist'))
app.use(express.static(path.join(DIST_DIR, 'public/')));
app.use(express.static(path.join(DIST_DIR, 'dist/')));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Listener
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`);
});