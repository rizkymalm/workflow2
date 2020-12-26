const express = require("express")
const Router = express.Router()
const IndexController = require("../controllers/index");
const requestController = require("../controllers/request")
const projectController = require("../controllers/project")
const multer = require("multer")
const db = require("../models/db")
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null, 'public/fileupload')
	},
	filename: function(req,file,cb){
        var fileEXT = file.originalname.substr(file.originalname.lastIndexOf('.')+1);
		cb(null, file.originalname)
	}
})
var upload = multer({storage: storage})
Router.get("/", IndexController.getIndex);
Router.get("/request", requestController.getRequest)
Router.get("/request/create", requestController.getCreateRequest)
Router.get("/request/detail/:reqId", requestController.getDetailRequest)
Router.get("/userdep/:iddep/:isleader",  requestController.getDept)
Router.get("/request/detail/addnew/:type/:id", requestController.getAddAjax)
Router.get("/request/edit/ajax/:tipe/:id", requestController.getEditAjaxRequest)
Router.post("/request/change", requestController.saveEditRequest)
Router.post("/request/comment/", requestController.getAddComment)
function getdept(iddep){
    return new Promise(resolve => {
        db.query("SELECT * FROM department WHERE id_department=?",[iddep], function(err,result){
            resolve(result)
        })
    })
}
Router.post("/request/save", upload.array('fileupload'),(req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        var iddep = req.body.dept
        db.query("SELECT *  FROM request WHERE id_department=? ORDER BY id_request DESC LIMIT 1",[iddep], async function(err,resID){
            let getDate = new Date();
            var dept = await getdept(req.body.dept);
            var initial = dept[0].initial
            if(resID.length==0){
                var newID = initial+"-0001";
            }else{
                var getString = resID[0].id_request.substr(4,5);
                var countID = parseInt(getString) + 1;
                var newID = initial+"-"+countID;
            }
            let data = ({
                id_request: newID,
                id_project: req.body.project,
                id_req_from: login.idses,
                id_req_to: req.body.assignee,
                id_department: req.body.dept,
                subj_req: req.body.subject,
                desc_req: req.body.desc,
                duedate: req.body.duedate,
                priority_issue: req.body.priority,
                status: "open",
                created_req: getDate,
                update_req: getDate
            })
            let notif = ({
                id_to: req.body.assignee,
                id_from: login.idses,
                id_request: newID,
                type_notif: "request",
                date_notif: getDate
            })
            let worklog = ({
                id_employee: login.idses,
                id_log: newID,
                log_type: "create",
                detail_log: "request",
                update_log: getDate
            })
            db.query("INSERT INTO request set ?", [data],(err1) => {
                db.query("INSERT INTO notification set ?", [notif],(err2) => {
                    db.query("INSERT INTO worklog set ?", [worklog],(err3) => {
                        for(var i=0;i<req.files.length;i++){
                            var uploadfile = {id_project: "0", id_request: newID, file_name: req.files[i].filename, file_upload: getDate};
                            db.query("INSERT INTO attachment set ?", uploadfile,(errupload) => {})
                        }                            
                        if(err1){
                            throw err1;
                        }else{
                            res.redirect('/request');
                        }
                    })
                })
            })
        })
    }
})
Router.post("/request/attachment", upload.array('fileupload'),(req,res) => {
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        let getDate = new Date();
        id = req.body.id;
        for(var i=0;i<req.files.length;i++){
            var uploadfile = {id_employee: login.idses, id_data: id, type_attachment: "request", file_name: req.files[i].filename, file_upload: getDate};
        }
        db.query("INSERT INTO attachment set ?", uploadfile,(errupload) => {
            res.redirect("../../detail/"+id)
        })
    }
})

Router.get("/project", projectController.getProject)
Router.get("/project/create", projectController.getCreateProject)
function getlastclient(){
    return new Promise(resolve => {
        db.query("SELECT * FROM client ORDER BY id_client DESC LIMIT 1", function(err,result){
            if(result.length==0){
                var jsondata = ({check: false, idclient: "10001"})
            }else{
                var jsondata = ({check: true, idclient: result[0].id_client})
            }
            resolve(jsondata)
        })
    })
}
Router.post("/project/save", upload.array('fileupload'), async function(req,res) {
    let getDate = new Date();
    if(!req.session.loggedin){
        res.redirect("/login")
    }else{
        var login = ({idses: req.session.idses, emailses: req.session.email, iddep: req.session.iddep})
        if(req.body.client=="new"){
            var lastclient = await getlastclient();
            if(lastclient.check==false){
                var idclient = lastclient.idclient
            }else{
                var idclient = lastclient.idclient + 1;
            }
            var dataclient = ({id_client: idclient, client_name: req.body.newclient})
            db.query("INSERT INTO client set ?",[dataclient], function(err){})
        }else{
            var idclient = req.body.client
        }
        var data = {id_project: req.body.idprj, id_employee: login.idses, id_client: idclient, project_name: req.body.project, project_desc: req.body.desc, project_duedate: req.body.duedate, created_project: getDate, update_project: getDate};
        db.query("INSERT INTO project set ?", data, function(err1,result) {
            if(err1){
                res.redirect("../project/create")
            }else{
                var datalog = {id_employee: login.idses, id_log: req.body.idprj, log_type: "create", detail_log: "project", update_log: getDate}
                db.query("INSERT INTO worklog set ?", datalog, function(err2) {})
                //upload attachment
                for(var i=0;i<req.files.length;i++){
                    var uploadfile = {id_employee: login.idses, id_data: req.body.idprj, type_attachment: "project", file_name: req.files[i].filename, file_upload: getDate};
                    db.query("INSERT INTO attachment set ?", uploadfile, function(errupload) {})
                }
                //upload attachment
                res.redirect('../project/detail/'+req.body.idprj);
            }
        })
    }
})
Router.get("/project/detail/:prjid", projectController.getDetailProject);
module.exports = Router;