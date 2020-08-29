const mySQL = require('mysql');

const mySQLConnection= mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'company'
});

mySQLConnection.connect(function(err){
    if(err){
        console.error(err);
        return;
    }
    else{
       console.log('Db is connected');
    }
})

module.exports = mySQLConnection;