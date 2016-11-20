/* ngbaanh */
var subKey = '6d4c2daabe474357aa15ebf5df19b57c'; // for fast test only, please keep it in DB instead
var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
var apiPassword = '7b6c2586a7a64ea9497bf2ccd094f71b8d0423dfd815a4978b00db5092977d38'; //Wistia API access Token

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
		if(regex.test(operationLocation)){
			res.render('video-api/wait-for-result', {
				operationLocation: operationLocation,
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
		// listImage.push("https://scontent-hkg3-1.xx.fbcdn.net/t31.0-8/1402901_584897204911215_1892496681_o.jpg");
		// listImage.push("https://scontent-hkg3-1.xx.fbcdn.net/t31.0-8/13958088_1137471922987071_5854645155938111230_o.jpg");
		// listImage.push("https://scontent-hkg3-1.xx.fbcdn.net/t31.0-8/13131759_1065357516865179_7322884558130679556_o.jpg");
		listImage.push("https://scontent-hkg3-1.xx.fbcdn.net/t31.0-8/13909186_1130987973635466_983780621913768657_o.jpg");
		res.render('face-api/comparePersonFace',{key:key,listImage:listImage});
	}
};
