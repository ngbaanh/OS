var Student = require('../models/Student'),
    Util = require('../services/Util');

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
    },
    student_detail: function(req, res, next) {
        Student.findOne({_id: req.query.studentId}, function(err, student){
            if (err) {
                return next(err);
            } else {
                res.render('site/student-detail', {student: student});
            }
        });
    },
    edit_student: function(req, res, next) {
        Student.findOne({_id: req.body.studentId}, function(err, student){
            if (err) {
                return next(err);
            } else {
                student.student_ID = req.body.student_ID;
                student.student_name = req.body.student_name;
                student.date = req.body.date;
                student.class = req.body.class;
                student.status = req.body.status;
                student.save(function(err, student){
                    if (err) {
                        return next(err);
                    } else {
                        res.redirect('/student-list');
                    }
                });
            }
        });
    },
    send_mail: function(req, res, next){
        Student.find({}, function(err, students){
            if (err) {
                return next(err);
            } else {
                var text = "";
                for (var i = 0; i < students.length; i++) {
                    text += students[i].student_ID + ', ' + students[i].student_name + ', ' + students[i].class + ', ' + students[i].status + '\n';
                }
                console.log(text);
                var html = "";
                
                for (var i = 0; i < students.length; i++){
                    if (students[i].status === 1) status = 'Attendant';
                    else status = 'Absent';
                    html += '<tr style="border: 1px solid black">\n\
                        <td style="border: 1px solid black">'
                            +students[i].student_ID+
                        '</td>\n\
                        <td style="border: 1px solid black">'
                            +students[i].student_name+
                        '</td>\n\
                        <td style="border: 1px solid black">'
                            +students[i].class+
                        '</td>\n\
                        <td style="border: 1px solid black">'
                            +status+
                        '</td>\n\
                    </tr>';
                }
                console.log(html);
                var mailOptions = {
                    from: 'Ngoc Anh', // sender address
                    to: 'ngocanh12t3bkdn@gmail.com', // list of receivers
                    subject: 'Check attendant', // Subject line
                    text: text, // plaintext body
                    html: 
                        '<table style="border: 1px solid black">\n\
                            <caption>Check attendant result</caption>\n\
                            <thead style="border: 1px solid black">\n\
                                <th style="border: 1px solid black">Student ID</th>\n\
                                <th style="border: 1px solid black">Student name</th>\n\
                                <th style="border: 1px solid black">Class</th>\n\
                                <th style="border: 1px solid black">Status</th>\n\
                            </thead>\n\
                            <tbody style="border: 1px solid black">'
                            +html
                            +'</tbody>\n\
                        </table>' 
                };
                Util.sendNodeMailer(mailOptions, function(err) {
                    if (err) {
                        return next(err);
                    } 
                    //req.flash("success", "Send message successfully");
                    res.redirect('/student-list');
                });
            }
        });
    }
};