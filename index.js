
exports.printMsg = function() {
  console.log("This is a message from the demo package");
};

exports.checkDB = function ( couchURL, databaseName ) {
	var couchDBURL = couchURL + "/" + databaseName;
	return this.returnObjfromURL(couchDBURL);
};


exports.returnObjfromURL = function ( URL ) {

    var syncRequest = require('sync-request');
    var response = syncRequest('get', URL );
    var responseString = response.getBody('utf8');
    return JSON.parse(responseString);

};
