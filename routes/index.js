const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

// route home page
router.get('/', function(req, res, next) {
    res.render('index', { projects });
});

// route about page
router.get('/about', function(req, res, next) {
    res.render('about', { projects });
});

// route recipes page (dynamic)
router.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
      res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `This project page does not exist`
        next(err);
    }
});

module.exports = router;
