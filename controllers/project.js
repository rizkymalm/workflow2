const db = require("../models/db")
const moment = require("moment")
function getCLientById(idclient){
    return new Promise(resolve => {
        db.query("SELECT * FROM client WHERE id_client=?",[idclient],function(err,result){
            resolve(result)
        })
    })
}
exports.getProject = (req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        var obj = []
        db.query("SELECT * FROM project JOIN employee ON project.id_employee=employee.id_employee", async function(err,prj) {
            for(var i=0;i<prj.length;i++){
                var created_date = moment(prj[i].created_project).format('DD-MMM-YYYY')
                var due_date = moment(prj[i].project_duedate).format('DD-MMM-YYYY')
                if(prj[i].assigned_project=='y'){
                    var assigned = "Assigneed"
                }else{
                    var assigned = "Not Assignee"
                }
                var getclient = await getCLientById(prj[i].id_client)
                obj.push({id: prj[i].id_project, project_name: prj[i].project_name, researcher: prj[i].name_employee, duedate: due_date, created: created_date, client: getclient[0].client_name, is_assigned: assigned});
            }
            res.render("project", {
                objs: obj,
                login: login
            });
        })
    }
}
function getAllCLient(){
    return new Promise(resolve => {
        db.query("SELECT * FROM client",function(err,result){
            resolve(result)
        })
    })
}
exports.getCreateProject = async function(req,res){
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        var getdate = new Date();
        var client = await getAllCLient();
        res.render("createproject", {
            min_date : moment(getdate).format("YYYY-MM-DD"),
            login: login,
            cli: client
        })
    }
}

exports.getDetailProject = (req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        var getdate = new Date();
        db.query("SELECT * FROM project JOIN employee ON project.id_employee=employee.id_employee WHERE project.id_project='"+req.params.prjid+"'", (err1,result) => {
            db.query("SELECT * FROM employee WHERE id_employee='"+login.idses+"'", (err2,resemployee) => {
                db.query("SELECT * FROM worklog JOIN employee ON worklog.id_employee=employee.id_employee WHERE id_log='"+req.params.prjid+"'", (err3,reslog) => {
                    db.query("SELECT * FROM request JOIN employee ON request.id_req_to=employee.id_employee WHERE id_project='"+req.params.prjid+"'", (err4,request) => {
                        db.query("SELECT * FROM attachment WHERE id_data='"+req.params.prjid+"'", (err5,attachment) => {
                            db.query("SELECT * FROM client WHERE id_client=?", [result[0].id_client], (err, cli) => {
                                if(result[0].assigned_project=='y'){
                                    var is_assigned = 'Assigned'
                                }else{
                                    var is_assigned = 'Not Assigned'
                                }
                                res.render("detail_project", {
                                    prj: result,
                                    employee: resemployee,
                                    logs: reslog,
                                    is_assigned: is_assigned,
                                    moment: moment,
                                    request: request,
                                    attach: attachment,
                                    rescli: cli,
                                    login: login
                                })
                            })
                        })
                    })
                })
            })
        })
    }
}