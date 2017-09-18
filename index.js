exports.printMsg = function() {
    console.log("This is a message from the demo package");
};

exports.checkDB = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.returnObjfromURL(couchDBURL);
    return JSON.parse ( Obj.responseString);
};

exports.listDatabases = function ( couchURL ) {
    var couchDBURL = couchURL + "/" + "_all_dbs";
    Obj = this.returnObjfromURL(couchDBURL);
    return JSON.parse ( Obj.responseString);
};




exports.returnObjfromURL = function ( URL ) {

    var returnObj = {}
    var syncRequest = require('sync-request');
    
    returnObj.startTime = (new Date).getTime();
    var response = syncRequest('get', URL );
    returnObj.endTime = (new Date).getTime();

    returnObj.duration = returnObj.endTime - returnObj.startTime;
    returnObj.duration = returnObj.duration + " milliseconds"

    var responseString = response.getBody('utf8');

    returnObj.responseCode = response.getBody('utf8');
    returnObj.responseString = responseString;
    
    return returnObj;
    
};
