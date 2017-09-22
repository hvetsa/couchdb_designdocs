
var couchUtils = require('couchdb_utilities');

var CouchURL = process.env.CouchURL;

console.log("***********listDatabases**************");
console.log( couchUtils.listDatabases( CouchURL ) );

console.log("***********databaseExists**************");
console.log( couchUtils.databaseExists( CouchURL, "test_backup" ) );
console.log( couchUtils.databaseExists( CouchURL, "GhostDB" ) );

console.log("***********createDatabase**************");
console.log( couchUtils.createDatabase( CouchURL, "test" ) );

console.log( couchUtils.createDatabase( CouchURL, "testtemp" ) );
console.log( couchUtils.listDatabases( CouchURL ) );
console.log( couchUtils.deleteDatabase( CouchURL, "testtemp" ) );
console.log( couchUtils.listDatabases( CouchURL ) );


console.log("***********validateConnection**************");
console.log( couchUtils.validateConnection( CouchURL ) );

console.log("***********getServerVersion**************");
console.log( couchUtils.getServerVersion( CouchURL ) );

console.log("***********responseDuration**************");
console.log( couchUtils.responseDuration( CouchURL ) );

console.log("***********getDatabaseDetails**************");
console.log( couchUtils.getDatabaseDetails( CouchURL, "test_backup" ) );

console.log("***********getDesignDocuments**************");
console.log( couchUtils.getDesignDocuments( CouchURL, "test" ) );

console.log("***********getDocumentbyID**************");
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "_design/View" ) );

console.log("***********createDocument**************");
console.log( couchUtils.createDocument( CouchURL, "test", '{"_id": "doc1", "okxbabc": "bkjdfbakj"}' ) );
console.log( couchUtils.createDocument( CouchURL, "test", '{"_id": "doc2", "okxbabc": "bkjdfbakj"}' ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "doc1" ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "doc2" ) );

console.log("***********updateDocument**************");
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "updateDocumentTest" ) );
console.log( couchUtils.createDocument( CouchURL, "test", '{"_id": "updateDocumentTest", "revision": "One"}' ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "updateDocumentTest" ) );
Obj = couchUtils.getDocumentbyID( CouchURL, "test", "updateDocumentTest" );
Obj.revision = "Two";
console.log( couchUtils.updateDocument( CouchURL, "test", JSON.stringify ( Obj ) ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "updateDocumentTest" ) );
console.log( couchUtils.deleteDocument( CouchURL, "test", "updateDocumentTest" ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "updateDocumentTest" ) );



console.log("***********deleteDocument**************");
console.log( couchUtils.createDocument( CouchURL, "test", '{"_id": "doc3", "okxbabc": "bkjdfbakj"}' ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "doc3" ) );
console.log( couchUtils.deleteDocument( CouchURL, "test", "doc3" ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "doc3" ) );
console.log( couchUtils.getDocumentbyID( CouchURL, "test", "doc4" ) );
console.log( couchUtils.deleteDocument( CouchURL, "test", "doc4" ) );

console.log("***********getDocumentsUsingQuery**************");
console.log ( couchUtils.getDocumentsUsingQuery( CouchURL, "test", "/_design/Report/_search/Search?include_docs=true&limit=3&sort=[\"-reportTime\"]&query=docType:Report" ) );


console.log("***********End of Testing**************");
console.log("***************************************");
console.log("***************************************");
console.log("***************************************");
console.log("***************************************");
