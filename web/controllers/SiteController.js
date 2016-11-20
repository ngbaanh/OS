var express = require('express'),
    router = express.Router(),
    Student = require('../models/Student');

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
                console.log(filteredStudent)
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
        })
    }
};