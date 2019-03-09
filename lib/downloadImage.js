'use strict';
const fs = require('fs'),
request = require('request'),
randomInt = require('./csprng.js');

module.exports.downloadFile = (fileToDl, key, path) => {
	return new Promise((resolve, reject) => {
		if (!fileToDl.status) {
			const random = randomInt(0, 99999999),
			fileName = '/image_' + random + '.' + fileToDl.ext,
			mediaDirectory = path,
			fullPath = mediaDirectory + fileName,
			fileStream = fs.createWriteStream(fullPath);
			delete fileToDl.ext
			fileStream.on('finish', function() {
				fileStream.close();
				fileToDl.filename = fullPath
				fileToDl.status = 'downloaded'
				resolve(fileToDl)		
			})
			.on('error', function(err) {
				fileToDl.status = err
				resolve(fileToDl)
			});
			request(fileToDl.url).pipe(fileStream);	
		} else
			resolve(fileToDl)	
	})
};
