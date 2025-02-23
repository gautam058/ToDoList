const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// mongodb
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// Todo routes
const todoRoutes = require('./route/todo.route.js');
app.use('/todo', todoRoutes);

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
app.listen(8080, () => {
    console.log("Server is listening on port 3000");
});
// Simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to the Todo app"});
// });

