const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/country/:name', (req, res) => {
    const countryName = req.params.name;
    
    axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).json({ error: "Error fetching country data" });
      });
  });

app.get('/test', (req, res) => {
  res.send('Backend connection successful!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
