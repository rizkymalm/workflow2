const express = require("express")
const Router = express.Router();
const db = require("../models/db")


Router.get("/", (req,res) => {
    if(req.session.loggedin==true){
        res.redirect("/")
    }else{
        res.render("login")
    }
});
Router.post("/auth", (req,res)=> {
    var email = req.body.email;
    var pass = req.body.password;
    db.query("SELECT * FROM employee WHERE email_employee = ? AND pass_employee = ? AND verify='1'", [email,pass], function(err, result, fields) {
        if(result.length > 0){
            req.session.loggedin = true;
            req.session.idses = result[0].id_employee;
            req.session.email = result[0].email_employee;
            req.session.name = result[0].name_employee;
            req.session.iddep = result[0].id_department
            if(result[0].admin==1){
                req.session.admin = true
            }else{
                req.session.admin = false
            }
            res.redirect("../")
        }else{
            res.redirect("../login")
        }
        res.end();
    })
})

module.exports = Router;