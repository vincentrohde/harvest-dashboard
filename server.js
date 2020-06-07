const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/api/time_entries', (req, res) => {
    const from = req.query.from || false;
    const to = req.query.to || false;
    const isTimeFrame = from && to;

    axios.get(TIME_ENTRIES_URL + `?from=${from}&to=${to}`, requestConfig)
        .then((response) => {
            const { time_entries } = response.data;
            res.send(JSON.stringify(time_entries));
        })
        .catch((error) => console.log(error));
});

app.listen(port, () => console.log('App listening on port 3000!'));