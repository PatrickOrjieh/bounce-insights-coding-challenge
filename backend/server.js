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
            if (response.data && response.data.length > 0) {
                res.json(response.data);
            } else {
                res.status(404).json({ error: "Country not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Error fetching country data" });
        });
});

app.get('/test', (req, res) => {
    res.send('Backend connection successful!');
});

app.use((req, res, next) => {
    res.status(404).json({ error: "Endpoint not found" });
});

app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
