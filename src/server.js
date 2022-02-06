const express = require('express');
const path = require('path');
const app = express();

app.listen(3000);

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
