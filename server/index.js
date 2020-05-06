
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {api} = require('./api/api.js');
const {checkVariables} = require('./api/checkEnvVars')

checkVariables();
const www = process.env.WWW || './dist/language-pronunciation';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static(www));
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: www });
});

const PORT = process.env.FUNCTIONS_HTTPWORKER_PORT;
const server = app.listen(PORT, "localhost", () => {
  console.log(`Your port is ${PORT}`);
  const { address: host, port } = server.address();
  console.log(`Example app listening at http://${host}:${port}`);
});


// module.exports = createHandler(app);

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

