const express = require('express');
const app = express();
const port = 3000;
const env = require('dotenv').config();
app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => res.send('Express World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));