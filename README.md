# Module under development.

# couchdb_utilities

Invocation of the module
```
var couchUtils = require('couchdb_utilities');
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
var Array = couchUtils.getDesignDocuments ( couchURL, databaseName ) {
```

### Document Utilities
#### get a document by ID
```
var Object = couchUtils.getDocumentbyID ( couchURL, databaseName, docID ) {
```
#### create a Document
```
var Boolean = couchUtils.createDocument( couchURL, databaseName, jsonString ) {
```
#### delete a Document
```
var Boolean = couchUtils.deleteDocument( couchURL, databaseName, docID ) {
```


#### Check if the view exist
### Design Docs
#### Create view

#### Check Views in target
#### Delete design docs in target db
#### Create Design docs in target
