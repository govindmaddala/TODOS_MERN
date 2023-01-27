require('dotenv').config('.env');
const mongoose = require('mongoose')
const express = require("express");
const cors = require('cors')
const path = require('path');
const bodyParser = require("body-parser");
const errorHandler = require('./middleware/ErrorHandler')
// const databaseConnect = require('./Database/DatabaseConnect');

// const taskAPI = require('./APIs/TaskAPI');
const userAPI = require('./APIs/UsersAPI');
const updatedTasksAPI = require('./APIs/TasksAPI')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./build')));
app.use(cors());
// databaseConnect();

app.get('/',(req,res,next)=>{
    res.send(path.join(__dirname,'/Backend/build/index.html'))
})

// app.use('/tasks',taskAPI);
app.use('/user',userAPI);
app.use('/tasks',updatedTasksAPI);

app.use(errorHandler);


const port = process.env.port || 5000

// app.listen(port, () => {
//     console.log(`Server is listening on ${port}`);
// })

mongoose.connect(process.env.MONGODB_LINK_CLOUD).then(()=>{
    app.listen(port);
    // console.log(`Server is listening on ${port}`);
}).catch((err)=>{
    console.log(err);
})