const express = require("express");
const db = require("../models/db")
const moment = require("moment")

function getDept(iddept){
	return new Promise(resolve => {
		db.query("SELECT * FROM department WHERE id_department=?",iddept, function(err,result){
			resolve(result)
		})
	})
}
exports.getIndex = async function(req,res){
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
		var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep, adminses: req.session.admin})
		var dept = await getDept(login.iddep)
		db.query("SELECT * FROM employee WHERE id_employee='"+login.idses+"'", (err1, verify) => {
			if(err1){
				console.log(err1)
			}else{
				if(verify[0].verify==1){
					db.query("SELECT * FROM request JOIN project ON request.id_project=project.id_project JOIN employee ON request.id_req_to=employee.id_employee WHERE request.id_req_to=? AND request.status='open' OR request.status='onprogres' OR request.status='reopen'", [login.idses], (err2,reqtome) => {
						db.query("SELECT * FROM request JOIN project ON request.id_project=project.id_project JOIN employee ON request.id_req_to=employee.id_employee WHERE request.id_department=? AND request.status='open' OR request.status='onprogres' OR request.status='reopen'", [login.iddep], (err3,bydept) => {
							res.render("index", {
								login: login,
								moment: moment,
								reqtome: reqtome,
								bydept: bydept,
								dept: dept
							})
						})
						console.log(reqtome)
					})
				}else{
					res.redirect("/login")
				}
			}
		})
    }
}
