const express = require('express');
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require("./database/conn")
const port = process.env.PORT || 3009;
const session = require('express-session');

app.use(session({
    resave: false, 
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const userRoutes = require('./router/user');
const taskListRoutes = require("./router/taskList")

app.use('/',userRoutes);
app.use('/',taskListRoutes);

app.listen(port, () => {
    console.log("================================================");
    console.log(`Server is running on port ${port}`);
});
