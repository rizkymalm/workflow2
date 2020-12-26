const db = require("../models/db");
const express = require("express");
const app = express();

exports.getUserIndex = (req, res) => {
	let users = req.session.user;
	let obj = []
	if(users[0].admin == 1){
		db.query("SELECT * FROM user JOIN departement ON user.id_departement = departement.id_departement", (err, dapat) => {
			for(var i=0;i<dapat.length;i++){
				obj.push({idUser: dapat[i].id_employee, email: dapat[i].Email, nama: dapat[i].nama, dept: dapat[i].department})
			}
			if (!dapat) {
				throw new Error();
			}
			res.render("user", { 
				obj: obj
			});
		});
	}else{
		res.redirect("/workflow");
	}
};

exports.getUserEdit = (req,res) =>{
	db.query("SELECT * FROM user WHERE id_employee='"+req.params.id_employee+"'",(err,res1) =>{
		db.query("SELECT * FROM team", (err1,team) => {
			db.query("SELECT * FROM departement", (err3,dept) => {
				res.render("edituser", {
					id: req.params.id_employee,
					dapat : res1,
					team: team,
					dept: dept
				})
			})
		})
	})
}

exports.getUserUpdate = (req,res) =>{
	db.query("UPDATE user SET Email ='"+req.body.email+"', nama='"+req.body.nama+"', id_departement ='"+req.body.dept+ "' WHERE id_employee='"+req.body.id+"'" ,(err) => {
		if(err) throw err;
		res.redirect("/workflow/user");
	})
}


exports.getTeam = (req,res) => {
	let obj = []
	db.query("SELECT * FROM team JOIN user ON team.id_leader=user.id_employee JOIN departement ON team.id_departement=departement.id_departement", (err,team) => {
		res.render("team", {
			teams: team
		})
	})
}
exports.getCreateTeam = (req,res) => {
	db.query("SELECT * FROM departement", (err,dept) => {
		res.render("createteam",{
			dept: dept
		})
	})
}
exports.getSaveTean = (req,res) => {
	var saveteam = {id_leader: req.body.leader, id_departement: req.body.dept, team_name: req.body.name}
	console.log(saveteam)
	db.query("INSERT INTO team set ?", saveteam,(err) => {
		db.query("UPDATE user SET leader='1' WHERE id_employee='"+req.body.leader+"'",(err1) => {
			res.redirect("/workflow/team")
		})
	})
}