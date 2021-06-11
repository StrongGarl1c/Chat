const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());
// app.use(express.static('public'));

// route paths
const index = require('./routes/index');

// routes
app.use('/api', index);
// app.use('/submitResult', submitResult);

app.listen(port, console.log('server is up'));
