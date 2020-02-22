let func = require('./../database/func')
let sql = require('./../database/sql')

module.exports = {

    getUserList (req, res) {
        func.connPool(sql.queryAll, 'user', (err,result) => {
            let rows = result;
            console.log('查询结果为: ', rows);
            res.json({code: 200, msg: 'ok', user: rows});
        });
        // pool.getConnection((err,conn)=>{
        //     conn.query('select * from ??','user', function(err,result) {
        //         if (err) throw err;
        //         console.log('查询结果为: ', result);
        //         rows = result;
        //     });
        // })
        // res.json({code: 200, msg: 'ok', user: rows});
    },

    getCarouselList (req, res) {
        func.connPool(sql.queryAll, 'slide', (err,result) => {
            let rows = result;
            console.log('查询结果为: ', rows);
            res.json({code: 200, msg: 'ok', slides: rows});
        });

    },

    getHotCourse (req, res) {
        func.connPool(sql.queryHot, 'hotcourselist', (err,result) => {
            let rows = result;
            console.log('查询结果为: ', rows);
            res.json({code: 200, msg: 'ok', hots: rows});
        });
    },

    getNewCourse (req, res) {
        func.connPool(sql.queryHot, 'newcourselist', (err,result) => {
            let rows = result;
            console.log('查询结果为: ', rows);
            res.json({code: 200, msg: 'ok', news: rows});
        });
    },

    getCourseDetail(req, res) {
        let id = req.body.courseid;
        func.connPool(sql.queryById, ['courselist','courseid',id], (err,result) => {
            let rows = result;
            console.log('查询结果为: ', rows);
            res.json({code: 200, msg: 'ok', course: rows});
        });

    },



    getCoursePage(req, res) {
        let pageid = req.body.pageid;
        let p = (pageid-1)*25;

        let coursetype = req.body.type;

        if(coursetype == 1){
            func.connPool(sql.queryAll, 'courselist', (err,result) => {
                let rows = result;
                let lens = rows.length;
                let sortedrows = rows.slice(p,p+25);

                console.log('查询结果为: ', sortedrows);
                res.json({code: 200, msg: 'ok', course: sortedrows , len :lens});
            });
        }else {
            func.connPool(sql.queryById, ['courselist','coursetype',coursetype-1], (err,result) => {
                let rows = result;
                let lens = rows.length;
                let sortedrows = rows.slice(p,p+25);
                console.log('查询结果为: ', sortedrows);
                res.json({code: 200, msg: 'ok', course: sortedrows , len :lens});
            });
        }


    },



    register(req,res){
        let userid = req.body.userid;
        let pwd = req.body.pwd;
        let name = req.body.name;

        func.connPool(sql.queryById, ['user','userid', userid ] , (err,result) => {
            let rows = result;

            if(rows.length == 0){

                func.connPool(sql.register, [ userid , name , pwd ] , (err,result) => {
                    res.json({code: 200, msg: 'ok'});

                });
            }else {
                res.json({code: 500, msg: 'chongfu' });
            }
        });

    },


    login(req,res){
        let userid = req.body.userid;
        let pwd = req.body.pwd;


        func.connPool(sql.queryById, ['user','userid', userid ] , (err,result) => {
            let rows = result;

            if(rows.length == 0){

                res.json({code: 501, msg: 'weizhaodao' });
            }else {
                if(rows[0].password == pwd){
                    res.json({code: 200, msg: 'weizhaodao', user:rows });
                }else {
                    res.json({code: 502, msg: 'mimacuowu' });
                }
            }
        });

    },

    getCart(req,res){

        let userid = req.body.userid;

        func.connPool(sql.queryCart, ['shopcart','userid', userid ] , (err,result) => {
            let rows = result;

            if(rows.length == 0){

                res.json({code: 501, msg: 'weizhaodao' });
            }else {

                res.json({code: 200, msg: 'ok', cart:rows });

            }
        });

    },

    addCart(req,res){

        let userid = req.body.userid;
        let courseid = req.body.courseid;

        func.connPool(sql.queryById, [ 'orders','userid' , userid ] , (err,result) => {
            let row = result
            let coursearr = []

            let state = false;

            for (let n in row) {
                let str = row[n].userorder;
                let spl = str.split(',')
                coursearr = coursearr.concat(spl)

            }
            for (let m in coursearr) {
                if (coursearr[m] == courseid) {

                    state = true;
                    break;
                }
            }
            if(state == true){

                res.json({code: 505, msg: 'yigoumai'});
            }else {
                func.connPool(sql.queryCart, ['shopcart','userid', userid ] , (err,result) => {
                    let rows = result;

                    if(rows.length == 0){

                        func.connPool(sql.addCart,[userid,courseid] ,(err,result) =>{
                            res.json({code: 200, msg: 'ok' });
                        })
                    }else {
                        let com = false
                        for(let i in rows){

                            if(rows[i].courseid == courseid){
                                res.json({code: 503, msg: 'gouwucheyiyou'});
                                com = true
                                break;
                            }
                        }
                        if(com == false){
                            func.connPool(sql.addCart,[userid,courseid] ,(err,result) =>{
                                res.json({code: 200, msg: 'ok' });
                            })
                        }

                    }
                });
            }
        });


    },

    delCart(req,res){

        let userid = req.body.userid;
        let courseid = req.body.courseid;

        func.connPool(sql.delCart, ['shopcart', userid , courseid] , (err,result) => {
            res.json({code: 200, msg: 'ok' });
        });

    },

    getPay(req,res){

        let orderdata = req.body.order;
        let userid = orderdata[0].userid;
        let arr = []

        for(let i in orderdata){
            arr.push(orderdata[i].courseid)
        }
        let order = arr.join(',');



        func.connPool(sql.addOrder, [ userid ,order ] , (err,result) => {
            res.json({code: 200, msg: 'ok' });
        });
        func.connPool(sql.del, [ 'shopcart','userid' , userid ] , (err,result) => {
            console.log('ok')
        });

    },
    getUserCourse(req,res){
        let userid = req.body.userid;

        func.connPool(sql.queryById,[ 'orders','userid' , userid ] , (err,result) => {
            let rows = result;
            let coursearr = [];
            for (let n in rows) {
                let str = rows[n].userorder;
                let spl = str.split(',')
                coursearr = coursearr.concat(spl)
            }
            let instring = "'"+coursearr.join("','")+"'";
            console.log(instring)
            let usercourse = "select * from courselist where courseid in ("+instring+")";
            func.connPool(usercourse, (err,result) => {
                let final = result;
                res.json({code: 200, msg: 'ok',course: final });
            });
        });
    },
    getUserOrder(req,res){
        let userid = req.body.userid;

        func.connPool(sql.queryById,[ 'orders','userid' , userid ] , (err,result) => {
            let rows = result;
            res.json({code: 200, msg: 'ok',course: rows });
        });
    },
    changePassword(req,res){
        let oldpass = req.body.oldpassword;
        let newpass = req.body.newpassword;
        let userid = req.body.userid;
        console.log(oldpass);
        console.log(newpass);
        func.connPool(sql.queryById, ['user','userid', userid ] , (err,result) => {
            let rows = result;

            if(rows[0].password == oldpass){
                func.connPool(sql.changepass, [ newpass, userid ] , (err,result) =>{
                    res.json({code: 200, msg: 'xiugaichenggong' });
                })

            }else {

                res.json({code: 506, msg: 'mimacuowu' });

            }
        });

    },
    getEvaluation(req,res){
        let courseid = req.body.courseid;

        func.connPool(sql.queryById,['evaluation','courseid',courseid] , (err,result) => {
            let rows = result;
            console.log(rows)
            res.json({code: 200, msg: 'ok',eva: rows });
        });
    },
    toEvaluation(req,res){
        let courseid = req.body.courseid;
        let username = req.body.username;
        let text = req.body.text;
        console.log(courseid+username+text)
        func.connPool(sql.insEvaluation,[username,courseid,text] , (err,result) => {
            res.json({code: 200, msg: 'ok' });
        });
    }


}