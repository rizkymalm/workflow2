const db = require("../models/db")
const moment = require("moment")


exports.getRequest = (req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        var obj = []
        let sql = "SELECT * FROM request JOIN employee ON request.id_req_to=employee.id_employee";
        let query = db.query(sql, (err,result) => {
            if(err) throw err;
            for(var i=0;i<result.length;i++){
                obj.push({id: result[i].id_request, subject: result[i].subj_req, duedate: moment(result[i].duedate).format('DD-MMM-YYYY'), status: result[i].status, del: result[i].id_request, name: result[i].name_employee});
            }
            return res.render('request',{
                result: result,
                objs : obj,
                jsoon: JSON.stringify(obj),
                login: login
            })
        })
    }
}
exports.getDetailRequest = (req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        db.query("SELECT * FROM employee JOIN request ON employee.id_employee=request.id_req_from WHERE id_request='"+req.params.reqId+"'", (err, result) => {
            db.query("SELECT * FROM employee WHERE id_employee=?",result[0].id_req_to,function(err,resemp){
                db.query("SELECT * FROM employee JOIN comment ON employee.id_employee=comment.id_employee WHERE id_request='"+req.params.reqId+"'", (err,cmnt) => {
                    db.query("SELECT * FROM worklog JOIN employee ON worklog.id_employee=employee.id_employee WHERE id_log='"+req.params.reqId+"' ORDER BY update_log DESC", (err,reslog) => {
                        db.query("SELECT * FROM attachment WHERE id_data='"+req.params.reqId+"' OR id_data='"+result[0].id_project+"'", (err5,attachment) => {
                            db.query("SELECT * FROM project JOIN employee ON project.id_employee=employee.id_employee WHERE id_project='"+result[0].id_project+"'", (err6,project) => {
                                res.render("detail_request",  {
                                    issues: result,
                                    creator: result[0].Email,
                                    assignee: resemp,
                                    logs: reslog,
                                    comment: cmnt,
                                    prj: project,
                                    moment: moment,
                                    attach: attachment,
                                    login: login
                                })
                            })
                        })
                    })
                })
            })
        });
    }
}

function getAllDept(){
    return new Promise(resolve => {
        db.query("SELECT * FROM department", (err,result) => {
            resolve(result)
        })
    })
}

function getProjectByID(id){
    return new Promise(resolve => {
        db.query("SELECT * FROM project WHERE id_project=?",id, (err,result) => {
            resolve(result)
        })
    })
}


exports.getCreateRequest = async function(req,res){
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        if(req.query.prj!=undefined){
            var qprj = true
            var assignProject = await getProjectByID(req.query.prj)
        }else{
            var qprj = false
            var assignProject = ""
        }
        console.log(assignProject)
        var dept = await getAllDept()
        db.query("SELECT * FROM project", (errprj,project) => {
            res.render("createrequest", {
                login: login,
                dept: dept,
                project: project,
                qprj: qprj,
                assignProject: assignProject
            })
        })
    }
}

exports.getDept = (req,res) => {
    if(req.params.isleader==true){
		var sql = "SELECT * FROM employee WHERE id_department='"+req.params.iddep+"' AND leader='1'";
	}else{
		var sql = "SELECT * FROM employee WHERE id_department='"+req.params.iddep+"' AND leader='1'";
	}
	db.query(sql, (err,result) => {
		if(err) throw err;
		res.render("option", {
			result: result
		})
	})
}

exports.getAddAjax = (req,res) => {
    res.render("addnewajax", {
        tipe: req.params.type,
        id: req.params.id
    })
}
exports.getAddComment = (req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        let getDate = new Date();
        var id = req.body.id;
        var cmnt = req.body.cmnt;
        var iduser = login.idses
        var data = {id_request: id, id_employee: iduser, comment_text: cmnt, comment_date: getDate}
        var datalog = ({id_employee: iduser, id_log: id, log_type: 'comment', detail_log: 'request', update_log: getDate})
        db.query("INSERT INTO comment SET ?", data,(err,result)=>{
            db.query("INSERT INTO worklog SET ?", [datalog],(err2, savelog) => {
                if(err){
                    res.send("GAGAL")
                }else{
                    res.render("partials/actionajax");
                }
            })
        })
    }
}

exports.getEditAjaxRequest = (req,res) => {
    db.query("SELECT * FROM request JOIN employee ON request.id_req_to=employee.id_employee WHERE id_request='"+req.params.id+"'", (err,result) => {
        db.query("SELECT * FROM employee WHERE id_department=? AND id_employee NOT IN(?)",[result[0].id_department,result[0].id_req_to], (err1,getemployee) => {
            res.render("editrequestajax", {
                id: req.params.id,
                tipe: req.params.tipe,
                result: result,
                getemployee: getemployee,
                moment: moment
            })
        })
    })
}
function getEmployeeById(idemployee){
    return new Promise(resolve => {
        db.query("SELECT * FROM employee WHERE id_employee=?",[idemployee], function(err,result){
            resolve(result)
        })
    })
}
exports.saveEditRequest = (req,res) => {
    var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
    var getDate = new Date();
    var id = req.body.idreq;
    var updval = req.body.updval;
    var tipe = req.body.tipe;
    if(tipe=="id_req_to"){
        var detail_log = "Assignee"
    }else if(tipe=="priority_issue"){
        var detail_log = "Priority"
    }else if(tipe=="status"){
        var type_detail_loglog = "Status"
    }else if(tipe=="duedate"){
        var detail_log = "Due Date"
    }
    db.query("UPDATE request SET "+tipe+"='"+updval+"' WHERE id_request='"+id+"'", (err,result) => {
        var worklog = {id_employee: login.idses, id_log: id, log_type: "edit", detail_log: detail_log, update_log: getDate}
        db.query("INSERT INTO worklog set ?", worklog, async function(errlog,reslog) {
            if(tipe=="id_req_to"){
                var getEmployee = await getEmployeeById(updval)
                var notif = ({id_to: updval, id_from: login.idses, id_request: id, date_notif: getDate, open_notif: 'n'})
                db.query("INSERT INTO notification set ?", notif, (errnotif, notif)=>{})
                res.send(getEmployee[0].name_employee)
            }else{
                res.send(updval);
            }
        })
    })
}