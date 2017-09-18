# Module under development.

# couchdb_utilities

Invocation of the module
```
var couchUtils = require('couchdb_utilities');
```

### Database Utilities
#### Get list of Dbs in the Source

```
var Array = couchUtils.listDatabases( "http://0.0.0.0:5984" ) );
```
#### Check db in the target
```
var Boolean = couchUtils.listDatabases( "http://0.0.0.0:5984", "test" ) );
```


### Core
#### Verify Inputs
#### Validate connection - Source
#### Validate Connection - target

#### Check if the view exist
#### Create db in target

### Design Docs
#### Create view
#### Get design Docs in a db
#### Check Views in target
#### Delete design docs in target db
#### Create Design docs in target
