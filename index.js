exports.printMsg = function() {
    console.log("This is a message from the demo package");
};


// server Utilities

exports.validateConnection = function ( couchURL ) {
    var couchDBURL = couchURL;
    Obj = this.returnObjfromURL(couchDBURL);
    if ( Obj.responseCode == 200 ) {
        return true;
    } else {
        return false;
    }
};

exports.getServerVersion = function ( couchURL ) {
    var couchDBURL = couchURL;
    Obj = this.returnObjfromURL(couchDBURL);
    if ( Obj.responseCode == 200 ) {
        return JSON.parse( Obj.responseString).version;
    } else {
        return false;
    }
};

exports.responseDuration = function ( couchURL ) {
    var couchDBURL = couchURL;
    Obj = this.returnObjfromURL(couchDBURL);
    if ( Obj.responseCode == 200 ) {
        return Obj.duration;
    } else {
        return false;
    }
};

// database Utilities

exports.listDatabases = function ( couchURL ) {
    var couchDBURL = couchURL + "/" + "_all_dbs";
    Obj = this.returnObjfromURL(couchDBURL);
    return JSON.parse( Obj.responseString);
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

exports.deleteDatabase = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.callURL("DELETE", couchDBURL, null );

    if ( JSON.parse( Obj.responseString).ok == true ) {
        return true;
    } else {
        return false;
    }
};

exports.getDatabaseDetails = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.returnObjfromURL(couchDBURL);
    return JSON.parse( Obj.responseString);
};

// Design Document Utilities
exports.getDesignDocuments = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName + "/_all_docs?startkey=\"_design/\"&endkey=\"_design0\"&include_docs=true";
    Obj = this.returnObjfromURL(couchDBURL);
    Obj.rows = [ ];
    records = JSON.parse(Obj.responseString).rows;
    for ( Counter = 0; Counter < records.length; Counter++ ) {
        Obj.rows.push( records[Counter].doc );
    }
    return Obj.rows;
};

// Design Document Utilities
exports.getDocumentbyID = function ( couchURL, databaseName, docID ) {
    var couchDBURL = couchURL + "/" + databaseName + "/" + docID;
    Obj = this.returnObjfromURL(couchDBURL);
    
    return JSON.parse(Obj.responseString);
};

exports.createDocument = function ( couchURL, databaseName, document ) {
    var couchDBURL = couchURL + "/" + databaseName;
    var jsonPayload = {
        json: document
    };
    Obj = this.callURL("POST", couchDBURL, document );
    
    if ( JSON.parse( Obj.responseString).ok == true ) {
        return true;
    } else {
        return false;
    }
};

exports.deleteDocument = function ( couchURL, databaseName, docID ) {
    var couchDBURL = couchURL + "/" + databaseName;
    // var document = this.getDocumentbyID( couchURL, databaseName, docID );
    var rev = this.getDocumentbyID( couchURL, databaseName, docID )._rev;
    couchDBURL = couchURL + "/" + databaseName + "/" + docID + "?rev=" + rev;
    
    Obj = this.callURL("DELETE", couchDBURL, null );
    
    if ( JSON.parse( Obj.responseString).ok == true ) {
        return true;
    } else {
        return false;
    }
};

// Internal Methods
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
        var jsonPayload = { 
            json: JSON.parse( Payload ) 
        };
        
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