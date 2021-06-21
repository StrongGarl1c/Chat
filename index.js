const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(express.static('build/index.html'));

// route paths
const index = require('./routes/index');

// routes
app.use('/api', index);

app.listen(port, console.log('server is up'));
