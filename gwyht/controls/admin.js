let func = require('./../database/func')
let sql = require('./../database/sql')

module.exports = {

    addCourse (req, res) {
        let courseid = req.body.courseid;
        let coursename = req.body.coursename;
        let price = req.body.price;
        let imgurl = req.body.imgurl;
        let coursetype = req.body.coursetype;
        let bigimg = req.body.bigimg;
        let details = req.body.details;
        let describes = req.body.describes;
        let videourl = req.body.videourl;

        func.connPool(sql.queryById, ['courselist','courseid', courseid ] , (err,result) => {
            let rows = result;
            if(coursetype!= '1'&& coursetype!='2'&&coursetype!='3'&&coursetype!='4'){
                res.json({code: 602, msg: 'cuole' });
            }
            else if(rows.length == 0){
                func.connPool(sql.insCourse,
                    [courseid,coursename,price,imgurl,coursetype,bigimg,details,describes,videourl], (err,result) => {
                        res.json({code: 200, msg: 'ok'});
                });
            }else {
                res.json({code: 601, msg: 'chongfule' });
            }
        });

    },
    checkCourse (req, res) {
        func.connPool(sql.queryAll, 'courselist', (err,result) => {
            let rows = result;
            res.json({code: 200, msg: 'ok', course: rows});
        });
    },
    updateCourse (req, res) {
        let courseid = req.body.courseid;
        let coursename = req.body.coursename;
        let price = req.body.price;
        let imgurl = req.body.imgurl;
        let coursetype = req.body.coursetype;
        let bigimg = req.body.bigimg;
        let details = req.body.details;
        let describes = req.body.describes;
        let videourl = req.body.videourl;
        console.log(courseid)
        console.log(coursename)
        func.connPool(sql.updCourse, [coursename,price,imgurl,coursetype,bigimg,details,describes,videourl,courseid], (err,result) => {
            res.json({code: 200, msg: 'ok'});
        });


    },
    deleteCourse (req, res) {
        let courseid = req.body.courseid;
        func.connPool(sql.delCourse, courseid, (err,result) => {
            res.json({code: 200, msg: 'ok'});
        });
    },
    tuijianCourse(req,res){
        let hotid1 = req.body.hotid1;
        let hotid2 = req.body.hotid2;
        let hotid3 = req.body.hotid3;
        let hotid4 = req.body.hotid4;
        let hotid5 = req.body.hotid5;
        func.connPool(sql.updHotlist, [hotid1,'1'], (err,result) => {
            func.connPool(sql.updHotlist, [hotid2,'2'], (err,result) => {
                func.connPool(sql.updHotlist, [hotid3,'3'], (err,result) => {
                    func.connPool(sql.updHotlist, [hotid4,'4'], (err,result) => {
                        func.connPool(sql.updHotlist, [hotid5,'5'], (err,result) => {
                            res.json({code: 200, msg: 'ok'});
                        });
                    });
                });
            });

        });
    },
    xinkeCourse(req,res){
        let newid1 = req.body.newid1;
        let newid2 = req.body.newid2;
        let newid3 = req.body.newid3;
        let newid4 = req.body.newid4;
        let newid5 = req.body.newid5;
        func.connPool(sql.updNewlist, [newid1,'1'], (err,result) => {
            func.connPool(sql.updNewlist, [newid2,'2'], (err,result) => {
                func.connPool(sql.updNewlist, [newid3,'3'], (err,result) => {
                    func.connPool(sql.updNewlist, [newid4,'4'], (err,result) => {
                        func.connPool(sql.updNewlist, [newid5,'5'], (err,result) => {
                            res.json({code: 200, msg: 'ok'});
                        });
                    });
                });
            });
        });
    }

}