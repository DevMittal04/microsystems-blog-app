const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4000;

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    console.log(id, title);
    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch((err) => {
        console.log(err.message);
    });
    console.log(posts[id]);
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
});

app.listen(port, () => {
    console.log('Listening on', port)
});