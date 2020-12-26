const mysql = require("mysql");
// const con = mysql.createConnection({
//     host: "survey.kadence.co.id",
//     user: "adminqdt",
//     password: "QDTadmin@537",
//     database: "kadence-workflow"
// })

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "workflow",
    multipleStatements: true
})

con.connect(err => {
    if (err){
        throw err;
    }
})
module.exports = con;