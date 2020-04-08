const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const estimateRoutes = require('./routes/estimator');




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(upload.any());
app.use(function (req, res, next) {
    console.log(req.route,req.ip);
    next();
});
app.use("/api/v1/on-covid-19",estimateRoutes);

app.get('/',function(req,res,next){
   return res.json({
        message: "Welcome to Oyindamola's Covid-19 estimator"
    });
});


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


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
app.listen(port);

console.log('Listening on port ', port);