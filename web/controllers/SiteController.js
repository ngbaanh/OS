module.exports = {
	homepage: function(req, res, next) {
	  res.render('site/index', { title: 'Homepage' });
	},
	student_list: function(req, res, next){
	    res.render('site/student-list');
	},
	upload_file: function(req, res, next){
	    res.redirect('/student-list');
	}
};