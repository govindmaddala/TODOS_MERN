require('dotenv').config('.env');
const { MongoClient } = require('mongodb');
const express = require("express");
const cors = require('cors')
const path = require('path');
const bodyParser = require("body-parser");
const errorHandler = require('./middleware/ErrorHandler')
const databaseConnect = require('./Database/DatabaseConnect');

const userAPI = require('./APIs/UsersAPI');
const updatedTasksAPI = require('./APIs/TasksAPI')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './build')));
app.use(cors());

app.get('/', (req, res, next) => {
    res.send(path.join(__dirname, '/Backend/build/index.html'))
})

app.use('/user', userAPI);
app.use('/tasks', updatedTasksAPI);

app.use(errorHandler);
const port = process.env.port || 5000

// databaseConnect().then(()=>{
//     app.listen(port, () => {
//         console.log("listening for requests");
//     })
// });

databaseConnect().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})

// app.listen(port, () => {
//     console.log(`Server is listening on ${port}`);
// })
// const client = new MongoClient(process.env.MONGODB_LINK_CLOUD);
// client.connect(()=>{
//     app.listen(port);
// })

// client.connect(err => {
//     if (err) { console.error(err); return false; }
//     // connection to mongo is successful, listen for requests
//     app.listen(port, () => {
//         console.log("listening for requests");
//     })
// });