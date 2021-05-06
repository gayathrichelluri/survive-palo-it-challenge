// Loads env variables
require('dotenv').config({path: __dirname+'/.env'});

const express = require('express'); /* A module of node to make routes to database*/
const cors = require('cors');
const bodyParser = require('body-parser'); /* Express requires an additional middleware module to extract incoming data of a POST request.*/
const mysql = require('mysql');
var path = require('path');
const PORT = process.env.PORT || 3001;;

const app = express(); /* Initialize express */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup static directory to serve
app.use(express.static(path.resolve('client', 'build')));

var connection;
if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  }else{
    connection = mysql.createConnection({
        port: process.env.PORT_NAME,
        host: process.env.HOST_NAME,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })
  }

connection.connect(function(err){
    (err) ? console.log(err) : console.log("Connected to database successfully!");
});


require('./routes/html-routes')(app, connection);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});
