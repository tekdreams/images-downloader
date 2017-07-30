'use strict';
const imageType = require('image-type'),
fs = require('fs');

module.exports.initChecking = (images, path) => {
	return new Promise(function(resolve, reject) {
		if (images && Array.isArray(images)) {
	        fs.stat(path, function(err, data) {
	            if (err || !data.isDirectory()) {
	                reject({error: "Invalid directory"});
	            } else {
	                resolve(images);
	            }
	        });
	    }
	    else reject({error: "Please use an array of images"})
    });
}

module.exports.checkImageType = image => {
	return new Promise((resolve, reject) => {
		if (!image.status) {
			const lib = image.url.indexOf("https://") == 0 ? require('https') : require('http');
			lib.get(image.url, res => {
				res.once('data', chunk => {
					res.destroy();
					const type = imageType(chunk),
					ext = type ? type.ext : null;
					if (ext) {
						image.ext = ext
						resolve(image)
					}
					else {
						image.status = "Images allowed only"
						resolve(image)
					}
				});
			});	
		}
		else
			resolve(image) 	
	})
}

module.exports.isUrl = image => {
	const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/,
	isUrl = matcher.test(image) ? null : "Urls allowed only",
	imageObj = {
		filename : null,
		status:isUrl,
		url: image
	}
	return imageObj
}
