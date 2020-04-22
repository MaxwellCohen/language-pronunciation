
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {api} = require('./api/api.js');
const {checkVariables} = require('./api/checkEnvVars')

checkVariables();
const www = process.env.WWW || './';
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static(www));
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: www });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
