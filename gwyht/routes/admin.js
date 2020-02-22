var express = require('express');
var router = express.Router();

let admin = require('./../controls/admin')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '管理员' });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'add' });
});
router.post('/addcourse',admin.addCourse);

router.get('/check', function(req, res, next) {
  res.render('check', { title: 'check' });
});
router.get('/checkcourse',admin.checkCourse);
router.post('/updatecourse',admin.updateCourse);
router.post('/deletecourse',admin.deleteCourse);

router.get('/recommend', function(req, res, next) {
    res.render('recommend', { title: 'recommend' });
});

router.post('/tuijian',admin.tuijianCourse);
router.post('/xinke',admin.xinkeCourse);



module.exports = router;
