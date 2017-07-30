'use strict';
const fs = require('fs'),
request = require('request');

module.exports.downloadFile = (fileToDl, key, path) => {
	return new Promise((resolve, reject) => {
		if (!fileToDl.status) {
			const random = Math.floor(Math.random() * (Math.floor(10000) - Math.ceil(1))) + 1,
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
}
