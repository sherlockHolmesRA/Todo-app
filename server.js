//Import dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

// create express server
const app = express();

// Enable bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

// connect mongoose to mongodb server and set debug to monitor operations details
mongoose.connect("mongodb://localhost/monTodoApp");
mongoose.set('debug', true);

// Require the models
require('./server/models/task');
require('./server/models/todo');

// Appel des APIs
const api = require('./server/api');

// Set api routes
app.use('/api', api);

// Enable CORS: Cross Origin Resource Sharing
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Static path to dist
app.use(express.static(path.join(__dirname, 'todo-app/dist')));
 
//Catch all other routes and return to the index file
app.get('*', (req, res) =>{
   res.sendFile(path.join(__dirname, 'todo-app/dist/index.html'));
})

// Get environment port or use 3000
const port = process.env.PORT || '3000';
app.set("port",port);

// Create http server
const server = http.createServer(app);

// Listen on port
server.listen(port, () => console.log(`API running on localhost:${port}`));
