const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); //The ionic server
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server = app.listen(8080);
let io = require('socket.io').listen(server);

let converHistoryArr = [];

io.on('connection', function(socket){
    io.emit('currencyHistory', converHistoryArr);

    socket.on('currencyHistory', function(data){
        if(converHistoryArr.length === 11) {
            converHistoryArr.splice(0,1);
            converHistoryArr.push(data);
        } else {
            converHistoryArr.push(data);
        }
        io.emit('currencyHistory', converHistoryArr);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});