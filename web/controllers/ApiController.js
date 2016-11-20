/* ngbaanh */
var subKey = '6d4c2daabe474357aa15ebf5df19b57c'; // for fast test only, please keep it in DB instead
var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
var apiPassword = '7b6c2586a7a64ea9497bf2ccd094f71b8d0423dfd815a4978b00db5092977d38'; //Wistia API access Token
var Student = require('../models/Student');
module.exports = {
	/* @author: ngbaanh */
	/* Show upload form with subscription key inside */
	/* <HOST>/video-api/upload */
	video_api_upload: function(req, res, next) {
		var apiURL = 'https://api.projectoxford.ai/video/v1.0/trackface';
		res.render('video-api/upload', {
			apiURL: apiURL, 
			subKey: subKey,
			apiPassword: apiPassword, 
		});
	},

	/* @author: ngbaanh */
	/* wait the API server process the video and get result */
	video_api_wait_for_result: function(req, res, next) {
		var operationLocation = req.query.operationLocation;
		var uploadedVideoURL = req.query.uploadedVideoURL;
		if(regex.test(operationLocation)){
			res.render('video-api/wait-for-result', {
				operationLocation: operationLocation,
				uploadedVideoURL: uploadedVideoURL,
				subKey: subKey
			});
		} else {
			res.send('Operation Location is not valid!');
		}
	},

	/* @author: quang */
	/* test video api face detection */
	sample_detection: function(req, res, next) {
		res.render('video-api/sample_detection');
	},
	
	/* @author: phuc */
	/* test add person face of face-api  */
	addPersonFace: function(req, res, next){
		var key = '70a5f8d52d2d4d34909ddf5f3624782c';
		res.render('face-api/createPersonFace',{key:key});
	},

	/* @author: phuc */
	/* test compare face with face using face-api */
	comparePersonFace: function(req, res, next){
		var key = '70a5f8d52d2d4d34909ddf5f3624782c';
		var listImage = [];		
		//listImage.push("https://scontent-hkg3-1.xx.fbcdn.net/t31.0-8/14086255_1230246773672430_8102430862113403910_o.jpg");
		//listImage.push("https://s21.postimg.org/vq4jz79tz/15102150_935615266582396_1132777037_o.jpg");
		listImage.push("https://s22.postimg.org/hulmqbhb5/15127402_935615743249015_322149103_o.jpg");
		Student.find({}).exec(function(err,students){
			if (err) {
				return next(err);
			}

			res.render('face-api/comparePersonFace',{key:key,listImage:listImage, students:students});
		});
	}
};
