
exports.printMsg = function() {
  console.log("This is a message from the demo package");
};

exports.checkDB = function ( couchURL, databaseName ) {
	var couchDBURL = couchURL + "/" + databaseName;
  return this.returnObjfromURL(couchDBURL);
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

    returnObj.responseCode = statusCode;
    returnObj.responseString = responseString;
    
};
