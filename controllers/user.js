const db = require("../models/db");
const express = require("express");
const app = express();

exports.getUserIndex = (req, res) => {
    let obj = []
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep, adminses: req.session.admin})
        if(login.adminses == 1){
            db.query("SELECT * FROM employee JOIN department ON employee.id_department = department.id_department", (err, dapat) => {
                for(var i=0;i<dapat.length;i++){
                    obj.push({id_employee: dapat[i].id_employee, email: dapat[i].email_employee, nama: dapat[i].name_employee, dept: dapat[i].department})
                }
                if (!dapat) {
                    throw new Error();
                }
                res.render("user", { 
                    obj: obj,
                    login: login
                });
            });
        }else{
            res.redirect("/");
        }
    }
}

exports.getUserEdit = (req,res) =>{
    if(!req.session.loggedin){
        res.redirect("../../login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep, adminses: req.session.admin})
        if(login.adminses == 1){
            db.query("SELECT * FROM employee WHERE id_employee='"+req.params.id_employee+"'",(err,res1) =>{
                db.query("SELECT * FROM department", (err3,dept) => {
                    res.render("edituser", {
                        id: req.params.id_employee,
                        dapat : res1,
                        dept: dept,
                        login: login
                    })
                })
            })
        }
    }
}

exports.getUserUpdate = (req,res) =>{
	db.query("UPDATE user SET email_employee ='"+req.body.email+"', name_employee='"+req.body.nama+"', id_department ='"+req.body.dept+ "' WHERE id_employee='"+req.body.id+"'" ,(err) => {
		if(err) throw err;
		res.redirect("/user");
	})
}


exports.getTeam = (req,res) => {
	let obj = []
	db.query("SELECT * FROM team JOIN user ON team.id_leader=user.id_employee JOIN department ON team.id_department=department.id_department", (err,team) => {
		res.render("team", {
			teams: team
		})
	})
}
exports.getCreateTeam = (req,res) => {
	db.query("SELECT * FROM department", (err,dept) => {
		res.render("createteam",{
			dept: dept
		})
	})
}
exports.getSaveTean = (req,res) => {
	var saveteam = {id_leader: req.body.leader, id_department: req.body.dept, team_name: req.body.name}
	console.log(saveteam)
	db.query("INSERT INTO team set ?", saveteam,(err) => {
		db.query("UPDATE user SET leader='1' WHERE id_employee='"+req.body.leader+"'",(err1) => {
			res.redirect("/team")
		})
	})
}