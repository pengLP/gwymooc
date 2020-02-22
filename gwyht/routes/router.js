let express = require('express');
let router = express.Router();


let user = require('../controls/user')

router.get('/',function (req, res, next) {
    res.render('index', { title: 'api' });
});


router.get('/userList',user.getUserList);
router.get('/carouselList',user.getCarouselList);
router.get('/hotCourse',user.getHotCourse);
router.get('/newCourse',user.getNewCourse);

router.post('/getUserCourse',user.getUserCourse);
router.post('/getUserOrder',user.getUserOrder);

router.post('/courseDetail',user.getCourseDetail);

router.post('/register',user.register);
router.post('/login',user.login);
router.post('/getcart',user.getCart);
router.post('/addcart',user.addCart);
router.post('/delcart',user.delCart);
router.post('/pay',user.getPay);



router.post('/coursePage',user.getCoursePage);

router.post('/changePassword',user.changePassword);

router.post('/getEvaluation',user.getEvaluation);
router.post('/toEvaluation',user.toEvaluation);




module.exports = router;
