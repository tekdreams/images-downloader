'use strict';
const _ = require('underscore'),
isUrl = require(__dirname + '/lib/checkFile').isUrl,
downloadFile = require(__dirname + '/lib/downloadImage').downloadFile,
initChecking = require(__dirname + '/lib/checkFile').initChecking,
checkImageType = require(__dirname + '/lib/checkFile').checkImageType;

const images = (images, path) => {
	return new Promise((resolve, reject) => {
		return initChecking(images, path).then(images => {
			return Promise.all(_.map(images, image => { return isUrl(image)} ))
			.then(arrayImageObj => { return Promise.all(_.map(arrayImageObj, imageObj => { return checkImageType(imageObj)} )) })
			.then(imagesReadyToDl => { return Promise.all(_.map(imagesReadyToDl, (fileToDl, key) => { return downloadFile(fileToDl, key, path)}))})
			.then(imagesDownloaded => resolve(imagesDownloaded))
			.catch(error => reject(error))
		})	
		.catch(error => reject(error))
	})
}

module.exports.images = images;
