var Student = require('../models/Student');

module.exports = {
    homepage: function(req, res, next) {
      res.render('site/index', { title: 'Homepage' });
    },
    student_list: function(req, res, next){
        res.render('site/student-list');
    },
    upload_file: function(req, res, next){
        res.redirect('/student-list');
    },
    add_student: function(req, res, next){
        res.render('site/add-student');
    },
    send_student_info: function(req, res, next){
        var student = new Student(req.body);
        student.status = 0;
        student.save(function(err, student){
            if (err) {
                console.log(err);
            }
            res.redirect('/add-student');
        });
    },
    table_student: function(req, res, next){
        Student.find({}, function(err, filteredStudent){
            if (err) {
                res.json({
                    "error": err,
                    "recordsTotal": 0,
                    "recordsFiltered": 0,
                    "data": []
                });
            } else {
                var students = [];
                var start = parseInt(req.body.start);
                var length = parseInt(req.body.length);
                for (var i = start; i < start + length && i < filteredStudent.length; i++){
                    students.push(filteredStudent[i]);
                }
                res.json({
                    "recordsTotal": filteredStudent.length,
                    "recordsFiltered": filteredStudent.length,
                    "data": students
                });
            }
        });
    },
    delete_student: function(req, res, next) {
        for(var i = 0; i < req.body.countStudent; i++) {
            Student.remove({_id: req.body.listStudentId.split(';')[i]}).exec(function(err) {
                if (err) {
                    return next(err);
                }
            });
        }
        res.redirect('/student-list');
    }
};