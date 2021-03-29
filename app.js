// setup express
const express = require('express');
const app = express();

const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// route for static files
app.use( '/static', express.static('public') );

// import routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 404 handler
app.use((req, res, next) => {
    const err = new Error('Page not found.');
    err.status = 404;
    next(err);
})

// global error handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log('error 404');
        res.status(err.status);
        res.render('page-not-found', {err});
    } else {
        console.log('error 500');
        res.status(500);
        res.render('error', {err});
    }
});

// setup server
app.listen(3000);
console.log('listeing on port:3000')