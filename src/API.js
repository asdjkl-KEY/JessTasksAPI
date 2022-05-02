const express = require('express');
const api = express();
const morgan = require('morgan');


api.use(morgan("dev"));
api.use(express.urlencoded({extended: false}));
api.use(express.json());


app.listen(2525, () => {
    console.log("API is Started on port 2525");
})