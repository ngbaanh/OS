/* ngbaanh */

var express = require('express');
var router = express.Router();
var subKey = '6d4c2daabe474357aa15ebf5df19b57c'; // for fast test only, please keep it in DB instead
var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

/* Show upload form with subscription key inside */
/* <HOST>/video-api/upload */
router.get('/upload', function(req, res, next) {
	var apiURL = 'https://api.projectoxford.ai/video/v1.0/trackface';
	res.render('video-api/upload', {
		apiURL: apiURL, 
		subKey: subKey
	});
});

/* wait the API server process the video and get result */
router.get('/wait-for-result', function(req, res, next) {
	var operationLocation = req.query.operationLocation;
	if(regex.test(operationLocation)){
		res.render('video-api/wait-for-result', {
			operationLocation: operationLocation,
			subKey: subKey
		});
	} else {
		res.send('Operation Location is not valid!');
	}
});

module.exports = router;
