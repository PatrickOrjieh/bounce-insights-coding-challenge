const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/test', (req, res) => {
  res.send('Backend connection successful!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
