const waitSync  = require('wait-sync');
const func      = require('../functions');

var haveUser = function(id){
       var status = 0;
       var req =  global.connection.query('SELECT 1 FROM users WHERE TG_ID = ?', id, function(err,res){
            if(err) throw err;
            else{
                if(res.length > 0){
                   status = 1;
                }
            }
        });
        waitSync(0.1);
        if(req){
           return status;
        }
}

var regUser = function(data){
    var USER = {
        TG_ID: data.id,
        USER_NAME: data.username,
        USER_ACTION: 'GET_NAME',
        REG_DATE: func.getDateTime()
    }
    var status = 0;

    if(USER){
        var req = global.connection.query('INSERT INTO users SET ?', USER, function(err){
            if(err) throw err;
            else{
                status = 1;
            }
        });
        waitSync(0.1);
        if(req){
            return status;
        }
    }
}


var userAction = function(id){
    var action = null;
    var req = global.connection.query('SELECT * FROM users WHERE TG_ID = ?', id, function(err,res){
        if(err) throw err;
        else{
            if(res.length > 0){
                action = res[0].USER_ACTION;
            }
        }
    });
    waitSync(0.1);
    if(req){
        return action;
    }
}

var setAction = function(id,action){
    var callback;
    var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{USER_ACTION: action}, id], function(err,field){
        if(err) throw err;
        else{
            callback = 1;
        }
    });
    waitSync(0.1);

    if(req){
        return callback;
    }
}

var setName = function(id,name){
    var callbaack;
    var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{NAME: name}, id], function(err){
        if(err) throw err;
        else{
            callbaack = true;
        }
    });
    waitSync(0.1);
    if(req){
        return callbaack;
    }
}

var setContact = function(data){
    var callback;
    var req = global.connection.query('UPDATE users SET ? WHERE TG_ID = ?', [{TEL_NUMBER: data.phone_number},data.user_id], function(err){
        if(err) throw err;
        else{
            callback = true;
        }
    });

    waitSync(0.1);
    if(req){
        return callback;
    }
}


var getInfo = function(id){
    var callback;
    var req = global.connection.query('SELECT * FROM users WHERE TG_ID = ?',id,function(err,res){
        if(err) throw err;
        else{
            if(res.length > 0){
                callback = res[0];
            }
        }
    });
    waitSync(0.1);
    if(req){
        return callback;
    }
}



module.exports.haveUser      = haveUser;
module.exports.regUser       = regUser;
module.exports.userAction    = userAction;
module.exports.setAction     = setAction;
module.exports.setName       = setName;
module.exports.setContact    = setContact;
module.exports.getInfo       = getInfo;