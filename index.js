/*// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
const app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/resthub', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
//app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
//app.use('/api', apiRoutes);
app.use(apiRoutes);
// Launch app to listen to specified port
app.get('/', (req, res) => res.json({
    status: "success",
    message: 'The API is working!'
}));
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;
*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./api-routes');
const app = express();
//const dbUsername = process.env.DBUSERNAME;
//const dbPassword = process.env.DBPASSWORD;

const uri = "mongodb+srv://jordantan:Dayonday123@cluster0.5ip1z.mongodb.net/resthub?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to db'));
db.once('open', console.error.bind(console, 'Db connected successfully'));

app.use('/api', routes);

module.exports = app
