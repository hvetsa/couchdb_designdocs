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


exports.databaseExists = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.returnObjfromURL(couchDBURL);

    if ( Obj.responseCode == 404 ) {
        return false;
    } else {
        return true;
    }
};

exports.createDatabase = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.callURL("PUT", couchDBURL, null );

    if ( Obj.responseCode == 200 || Obj.responseCode == 201 ) {
        return true;
    } else {
        return false;
    }
};

exports.returnObjfromURL = function ( URL ) {

    var returnObj = {}
    var syncRequest = require('sync-request');
    
    returnObj.startTime = (new Date).getTime();
    var response = syncRequest('get', URL );
    returnObj.endTime = (new Date).getTime();

    returnObj.duration = returnObj.endTime - returnObj.startTime;
    returnObj.duration = returnObj.duration + " milliseconds"

    var responseString = response.body.toString('utf8');

    returnObj.responseCode = response.statusCode;
    returnObj.responseString = responseString;
    
    return returnObj;
    
};

exports.callURL = function ( Method, URL, Payload ) {
    
        var returnObj = {}
        var syncRequest = require('sync-request');
        var jsonPayload = { json: Payload };
        
        returnObj.startTime = (new Date).getTime();
        var response = syncRequest(Method, URL, jsonPayload );
        returnObj.endTime = (new Date).getTime();
    
        returnObj.duration = returnObj.endTime - returnObj.startTime;
        returnObj.duration = returnObj.duration + " milliseconds"
    
        var responseString = response.body.toString('utf8');
    
        returnObj.responseCode = response.statusCode;
        returnObj.responseString = responseString;
        
        return returnObj;
        
    };