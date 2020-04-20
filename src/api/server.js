const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const estimateRoutes = require('./routes/estimator');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
// const  accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', { stream: accessLogStream }));

app.use(morgan(':method   :url  :status  :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use("/api/v1/on-covid-19",estimateRoutes);

app.get('/',function(req,res,next){
   return res.json({
        message: "Welcome to Oyindamola's Covid-19 estimator"
    });
});






// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.status(400).json({
        message: 'Not found'
    });

});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.status(500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('Listening on port ', port);
});

