const express = require('express');
const bodyParser = require('body-parser');
const Handler = require('./handler/Handler.js');

const app = express();
// Should come from ENV
const port = 3000;

const handler = Handler.build();

app.use(bodyParser.json());

app.get('/', handler.handle);

app.listen(port, () => console.log(`Listening on port ${port}`));