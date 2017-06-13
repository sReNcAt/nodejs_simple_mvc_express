'use strict';
var async = require('async');
var mysql = require('mysql');
var model = require('../../models/main/main.index.model');

exports.index = function(req, res) {
    model.index('select * from test;',function(rest){
        res.render('../views/main/index.html',{
            index : queryarray(rest),
            session : req.session.user_id,
            adminsession : req.session.admin
        });
        console.log('ip : '+req.connection.remoteAddress);
        console.log(req.headers['user-agent']);
        console.log('--session--');
        console.log(req.session);
        console.log('--session--');
        if(req.session.user_id==null){
        }
        else{
            console.log(req.session.user_id);
        }
    });
};

exports.index2 = function(req,res){
    model.index('select * from test;',function(rest){
        var query = JSON.parse(rest);
        var temp = 0;
        res.render('../views/main/index2.html',{
            indexid : query[0].id,
            indexpw : query[0].pw
        });
        console.log('\nresult query : '+query);
        for(var i in query){
            console.log('id : '+query[i].id);
            console.log('pw : '+query[i].pw);
        }
    });
}

exports.signup = function(req, res) {
    res.render('../views/main/signup.html');
};
exports.signin = function(req, res) {
    res.render('../views/main/signin.html');
};
exports.logout = function(req, res) {
    req.session.user_id = null;
    req.session.admin = null;
    res.redirect('./');
};

exports.login = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    var body = req.body;
    var id = body.id;
    var pw = body.pw;
    console.log(body);
    console.log('id : '+id);
    console.log('pw : '+pw);
    console.log('ip : '+req.connection.remoteAddress);
    if(id==""||pw==""){
        res.render('../views/sign.html',{
            index : '올바른 정보를 입력하여 주세요.'
        });
    }else{
        model.index("select id,password,admin,teacher from member where id="+mysql.escape(id)+" and password="+mysql.escape(pw)+";",function(rest){
            console.log('삐빅... : '+rest);
            if (rest=='error'){
                res.render('../views/sign.html',{
                    index : '올바른 정보를 입력하여 주세요.'
                });
            }else{
                console.log('검증중..');
                console.log(rest);
                if(rest==null){
                    res.render('../views/sign.html',{
                        index : '올바른 정보를 입력하여 주세요.'
                    });
                }else{
                    var query = JSON.parse(rest);
                    console.log('query id : '+query[0].id);
                    console.log('query array : '+query[0]);
                    console.log('id : '+id);
                    if(query[0].id.toLowerCase()==id.toLowerCase()&&query[0].password==pw){
                        req.session.user_id = query[0].id;
                        if(query[0].admin=='y'){
                            req.session.admin = query[0].admin;
                        }
                        res.redirect('./');
                        console.log('\nresult query : '+query);
                    }else{
                        res.render('../views/sign.html',{
                            index : '올바른 정보를 입력하여 주세요.'
                        });
                    }
                }
            }
        });
    }
};

exports.sign = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    var body = req.body;
    var id = body.id;
    var pw = body.pw;
    var mail = body.mail;
    var name = body.name;
    console.log(body);
    console.log('id : '+id);
    console.log('pw : '+pw);
    console.log('email : '+mail);
    console.log('name : '+name);
    console.log('ip : '+req.connection.remoteAddress);
    if(id==""||pw==""||mail==""||name==""){
        res.render('../views/sign.html',{
            index : '다른 아이디, 메일주소, 닉네임을 사용하여 주세요.'
        });
    }else{
        model.index("insert into member (id,email,password,name)values ("+mysql.escape(id)+","+mysql.escape(mail)+","+mysql.escape(pw)+","+mysql.escape(name)+");",function(rest){
            console.log('삐빅... : '+rest);
            if (rest=='error'){
                res.render('../views/sign.html',{
                    index : '다른 아이디, 메일주소, 닉네임을 사용하여 주세요.'
                });
            }else{
                res.render('../views/sign.html',{
                    index : 'Success'
                });
                var query = JSON.parse(rest);
                console.log('\nresult query : '+query);
            }
        });
    }
};


function queryarray(sqls){
    var query = '';
    if(sqls==null||sqls=='undefined'){
        console.log('array : '+sql);
        return null;
    }else{
        var sql = JSON.parse(sqls);
        for(var i in sql){
            query = query+''+sql[i].id+'<br>'+''+sql[i].pw+'<br><br>';
        }
        console.log('output : '+query);
        return query;
    }
}
