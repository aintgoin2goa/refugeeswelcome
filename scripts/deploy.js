'use strict';
require('dotenv').load();
var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');

var REGION = 'eu-west-1';

var s3 = new AWS.S3({params: {Bucket: 'www.refugeeswelcomehere.org'}, region:REGION});
var dist = path.resolve(__dirname, '../dist/');

function getContentType(filename){
	var extension = filename.split('.').reverse()[0];
	switch(extension){
		case 'html': return 'text/html';
		case 'css' : return 'text/css';
		case 'js' : return 'text/javascript';
	}
}

function uploadFile(filename){
	console.log('upload %s', path.resolve(dist, filename));

	var stream = fs.createReadStream(path.resolve(dist, filename));

	return new Promise(function(resolve, reject){
		s3.upload({
			Key : filename,
			Body : stream,
			ACL : 'public-read',
			CacheControl : 'public, max-age=3600',
			ContentType : getContentType(filename)
		}, function(err){
			if(err) return reject(err);

			console.log('%s uploaded', filename);
			resolve();
		});
	})

}

console.log('dist folder', dist);


fs.readdir(dist, function(err, files){
	if(err){
		console.error(err);
		process.exit(1);
	}

	console.log('found these files: ', files);
	Promise.all(files.map(uploadFile)).then(function(){
		console.log('All files uploaded');
	}).catch(function(err){
		console.error(err);
	});
});





