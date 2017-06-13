'use strict';

var db=require('../../config/mysql.js');
var async = require('async');
var mysql = require('mysql'),
    pool  = mysql.createPool({
        connectionLimit : 10,
        host            : '10.0.0.1',
        port            : '3306',
        user            : 'enter your user id',
        password        : 'enter your password',
        database        : 'enter your database'
    });



exports.index = function (query,callback){
    async.waterfall([
        function (callback){
            console.log('\nDB START');
            console.log(query);
            callback(null,query);
        },
        function (arg1,callback){
            //*******************************************//
            pool.query(arg1, function(err, rows, fields) {
                var result = '';
                console.log('SQL : '+arg1);
                if(err){
                    //throw err
                    console.log('err...');
                    result='error';
                    callback(null,result);
                    return result;
                    //return err;
                }else{
                    if (rows!="") {
                        console.log('rows : '+rows);
                        result=JSON.stringify(rows);
                        //result=rows
                        console.log('result : '+result);
                        var ret=result;
                        callback(null,ret);
                        return ret;
                    } else {
                        var ret=null;
                        callback(null,ret);
                        return ret;
                    }
                }
            });
            //******************************************//
        }
    ],
                    function(err,result){
        if(err){
            console.log('err : ',err);
            callback('error');
            result = 'error';
            return result;
        }else{
            console.log('async result : ',result);
            console.log('DB OK!!...\n');
            callback(result);
            return result;
        }
    }
                   );
}
