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
}; //validateConnection

exports.getServerVersion = function ( couchURL ) {
    var couchDBURL = couchURL;
    Obj = this.returnObjfromURL(couchDBURL);
    if ( Obj.responseCode == 200 ) {
        return JSON.parse( Obj.responseString).version;
    } else {
        return false;
    }
}; //getServerVersion

exports.responseDuration = function ( couchURL ) {
    var couchDBURL = couchURL;
    Obj = this.returnObjfromURL(couchDBURL);
    if ( Obj.responseCode == 200 ) {
        return Obj.duration;
    } else {
        return false;
    }
}; //responseDuration

// database Utilities

exports.listDatabases = function ( couchURL ) {
    var couchDBURL = couchURL + "/" + "_all_dbs";
    Obj = this.returnObjfromURL(couchDBURL);
    return JSON.parse( Obj.responseString);
}; //listDatabases


exports.databaseExists = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.returnObjfromURL(couchDBURL);

    if ( Obj.responseCode == 404 ) {
        return false;
    } else {
        return true;
    }
}; //databaseExists

exports.createDatabase = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.callURL("PUT", couchDBURL, null );

    if ( Obj.responseCode == 200 || Obj.responseCode == 201 ) {
        return true;
    } else {
        return false;
    }
}; //createDatabase

exports.deleteDatabase = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.callURL("DELETE", couchDBURL, null );

    if ( JSON.parse( Obj.responseString).ok == true ) {
        return true;
    } else {
        return false;
    }
}; // deleteDatabase

exports.getDatabaseDetails = function ( couchURL, databaseName ) {
    var couchDBURL = couchURL + "/" + databaseName;
    Obj = this.returnObjfromURL(couchDBURL);
    return JSON.parse( Obj.responseString);
}; //getDatabaseDetails

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
}; //getDesignDocuments

// Design Document Utilities
exports.getDocumentbyID = function ( couchURL, databaseName, docID ) {
    var couchDBURL = couchURL + "/" + databaseName + "/" + docID;
    Obj = this.returnObjfromURL(couchDBURL);
    
    return JSON.parse(Obj.responseString);
}; //getDocumentbyID

exports.getDocumentsUsingQuery = function ( couchURL, databaseName, queryString ) {
    var returnDocuments = [ ];
    var couchDBURL = couchURL + "/" + databaseName + "/" + queryString;
    Obj = this.returnObjfromURL(couchDBURL);
    console.log(Obj);
    if ( Obj.responseCode == 404 ){
        return false;
    }
    rows = JSON.parse ( Obj.responseString ).rows;
    for ( Counter = 0; Counter < rows.length; Counter++ ) {
        returnDocuments.push( rows[Counter].doc );
    }

    return returnDocuments;
}; //getDocumentsUsingQuery

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
}; //createDocument

exports.updateDocument = function ( couchURL, databaseName, document ) {
    var couchDBURL = couchURL + "/" + databaseName + "/" + JSON.parse( document )._id;
    var jsonPayload = {
        json: document
    };
    Obj = this.callURL("PUT", couchDBURL, document );

    if ( JSON.parse( Obj.responseString).ok == true ) {
        return true;
    } else {
        return false;
    }
}; //updateDocument

exports.deleteDocument = function ( couchURL, databaseName, docID ) {
    var couchDBURL = couchURL + "/" + databaseName;
    var rev = this.getDocumentbyID( couchURL, databaseName, docID )._rev;
    couchDBURL = couchURL + "/" + databaseName + "/" + docID + "?rev=" + rev;
    
    Obj = this.callURL("DELETE", couchDBURL, null );
    
    if ( JSON.parse( Obj.responseString).ok == true ) {
        return true;
    } else {
        return false;
    }
}; //deleteDocument

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
    
}; // returnObjfromURL

exports.callURL = function ( Method, URL, Payload, headers ) {
    
    var returnObj = {}
    var syncRequest = require('sync-request');
    if ( ! headers ) {
        var headers = { "Content-Type": "application/json" };
    }

    var jsonPayload = {
        headers: headers,
        body: Payload 
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
}; // callURL