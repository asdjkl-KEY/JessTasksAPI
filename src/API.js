const express = require('express');
const app = express();
const morgan = require('morgan');
const _ = require('underscore');


//configuraciones
app.set('port', process.env.PORT || 4040);
app.set("json spaces", 2);

//middlewares

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
app.use(require('./router'));

//API iniciada
app.listen(app.get('port'), () => {
    console.log("API is Started on port "+ app.get('port'));
})