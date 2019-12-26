const express = require('express');
const app = express();
const io = require('socket.io');

app.get('/', (req,res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {
    console.log('new conection')
});

app.listen(5000, () => {
    console.log('listening on 5000');
});