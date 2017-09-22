# Module under development.

# couchdb_utilities

### Invocation of the module
```
var couchUtils = require('couchdb_utilities');
```

### Simple program
A simple program to obtain the size of all databases in a couchdb account will look like this
```
var couchUtils = require('couchdb_utilities');

var CouchURL = process.env.CouchURL;
var outputString = "";

var databases = couchUtils.listDatabases( CouchURL );
outputString = outputString +  "DatabaseName" + "," + "DatabaseSize(Bytes)" + "\n";
for ( Counter = 0; Counter < databases.length; Counter++ ) {
    outputString = outputString +  databases[Counter] + "," + couchUtils.getDatabaseDetails( CouchURL, databases[Counter] ).disk_size + "\n";
}
console.log(outputString);

$ node getDatabaseSize.js 
DatabaseName,DatabaseSize(Bytes)
development,1123012
preproduction,594596
production,594596
test,66352
test2,17032
test_backup,66352
$
```

### Server Utilities
#### Validate the input connection string
```
var Boolean = couchUtils.validateConnection ( couchURL ) );
```
#### Validate the input connection string
```
var String = couchUtils.getServerVersion ( couchURL ) );
```
#### Validate the input connection string
```
var String = couchUtils.responseDuration ( couchURL ) );
```

### Database Utilities
#### Get list of databases
```
var Array = couchUtils.listDatabases( couchURL ) );
```
#### Check if a database exists in the target
```
var Boolean = couchUtils.databaseExists( couchURL, "test" ) );
```
#### Create a database in target
```
var Boolean = couchUtils.createDatabase( couchURL, "test" ) );
```
#### Delete a database in target
```
var Boolean = couchUtils.deleteDatabase( couchURL, "test" ) );
```
#### Obtain details of a database
```
var Object = couchUtils.getDatabaseDetails( couchURL, "test" ) );
```
### Design Document Utilities
```
var Array = couchUtils.getDesignDocuments ( couchURL, databaseName );
```

### Document Utilities
#### get a document by ID
```
var Object = couchUtils.getDocumentbyID ( couchURL, databaseName, docID );
```
#### get a document using Query
```
var Object = couchUtils.getDocumentsUsingQuery( couchURL, databaseName, queryString );
```
#### create a Document
```
var Boolean = couchUtils.createDocument( couchURL, databaseName, jsonString );
```
#### delete a Document
```
var Boolean = couchUtils.deleteDocument( couchURL, databaseName, docID );
```
