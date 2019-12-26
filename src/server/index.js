const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {
    console.log('we have a new conection');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg)
    })
});

http.listen(5000, () => {
    console.log('listening on 5000');
});