const express = require('express');
const app = express();
const PORT = 8080;

app.use('/', (req, res) => {
    res.header({ 'Content-Type': 'application/json' });
    res.end('Hello World');
});

app.listen(8080, () => console.log(`Server running on port: ${PORT}`));