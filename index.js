const express = require('express');
const path = require('path');
const app = express();
const socketIO = require('socket.io');

const list = ['Banana', 'Apple', 'Mango'];

app.get('/list', (req, res) =>{
    res.send(list);
});

app.use('/', express.static(path.join(__dirname, '/public'))); // servindo o index.html

const server = app.listen(3000, () =>{
    console.log('App running!');
});


const io = socketIO(server) // server é quem vai estar gerenciando as reqs http

/*  io se refere a input/output, e funciona como um "listener" para quando ocorrer um evento, neste caso "connection".
    Esta função socket é a conexão entre back e front, cada browser se conectando será uma representação do socket
    Precisamos preparar o front para receber essa conexão (importar no front)
*/
io.on('connection', (socket)=>{
    console.log('New connection');

    const randomsNums = [];

    //const randomNum = Math.random();
    //Math.round(Math.random() * 10)

    //randomsNums.push(randomNum)

    // emitindo para o socket.on() - os argumentos devem dar match
    socket.emit('hello', {msg: `Welcome from back! ${randomNum}`})

    //emitindo para todos user uma emissão com o mesmo numero basta trocar para io.
    //io.emit('hello', {msg: `Welcome from back! ${randomsNums}`})
    
    // emitindo mensagem para todos, menos ele mesmo/a própria aba
    // socket.broadcast.emit(...)
    socket.on('hello_from_front', (data) =>{
        console.log(data.msg);
    })
})


