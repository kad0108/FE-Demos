var express = require('express');
var router = express.Router();
var path = require('path');
var media = path.join(__dirname, "../public/media");

/* GET home page. */
router.get('/', function(req, res, next) {
	var fs = require('fs');
	fs.readdir(media, (err, names) => {
		if(err) console.log(err);
		else{
			res.render('index', { title: 'Audio', music: names});
		}
	})
  
});

module.exports = router;
