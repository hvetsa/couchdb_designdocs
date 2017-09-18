# Module under development.

# couchdb_utilities

Invocation of the module
```
var couchUtils = require('couchdb_utilities');
```

### Server Utilities


### Database Utilities
#### Get list of databases

```
var Array = couchUtils.listDatabases( "http://0.0.0.0:5984" ) );
```
#### Check if a database exists in the target
```
var Boolean = couchUtils.databaseExists( "http://0.0.0.0:5984", "test" ) );
```
#### Create a database in target
```
var Boolean = couchUtils.createDatabase( "http://0.0.0.0:5984", "test" ) );
```


### Core
#### Verify Inputs
#### Validate connection - Source
#### Validate Connection - target

#### Check if the view exist

### Design Docs
#### Create view
#### Get design Docs in a db
#### Check Views in target
#### Delete design docs in target db
#### Create Design docs in target
