var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/OS');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    student_ID: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    personId: {
        type: String,
        required: true
    }
}, {collection: 'student'});
var Student = mongoose.model('Student', StudentSchema);

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
    }
};