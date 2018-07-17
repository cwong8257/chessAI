const express = require('express');

const app = express();

app.use(express.static('dist'));

app.get('/api/hello', (req, res) => {
  res.json({
    string: 'hello',
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
