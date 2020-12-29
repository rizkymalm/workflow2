const express = require("express")
const mysql = require("mysql")
const bodyparser = require("body-parser")
const indexRouter = require("./routes/index")
const loginRouter = require("./routes/login")
const UserRouter = require("./routes/user");
const session  = require("express-session")
const partials = require("express-partials")
const db = require("./models/db")
const ejs = require("ejs")


const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

global.baseurl = function(){
	var url = "http://localhost:3001/";
    return url;
}

app.set("view engine", "ejs")
app.use(partials())
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/login", loginRouter)
app.use("/user", UserRouter);
app.get("/logout", function(req,res) {
    req.session.destroy();
    res.redirect("/login")
})
app.get("/top_desk", (req,res) => {
	var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
	db.query("SELECT * FROM notification JOIN employee ON notification.id_from=employee.id_employee JOIN request ON notification.id_request=request.id_request WHERE id_to='"+login.idses+"' AND open_notif='n' ORDER BY notification.date_notif DESC", (err,result) => {
		res.render("partials/topdesk", {
			res: result,
			login:login
		})
		console.log(result.length)
	})
})
app.get("/notifpopup", (req,res) => {
    var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
	db.query("SELECT * FROM notification JOIN employee ON notification.id_from=employee.id_employee JOIN request ON notification.id_request=request.id_request WHERE id_to='"+login.idses+"' ORDER BY notification.date_notif DESC LIMIT 5", (err,result) => {
		for(var i=0;i<result.length;i++){
			db.query("UPDATE notification SET open_notif='y' WHERE id_notification='"+result[i].id_notification+"'", (err2)=>{});
		}
		res.render("partials/notifpopup", {
			res: result
		})
	})
})
app.listen(3001, () => {

})