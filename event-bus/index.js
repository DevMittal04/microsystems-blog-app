const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const port = 4005;

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log('Post: ', err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log('Comment: ', err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log('Query: ', err.message);
    });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log('Moderation: ', err.message);
    });

    res.send({ status: 'OK' });
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(port, () => {
    console.log('Listening on', port);
})