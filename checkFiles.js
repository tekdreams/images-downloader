// the above flags can also be shortened down to just: mmm.MAGIC_MIME
var mmm = require('mmmagic');
var Magic = mmm.Magic;
var magic = new Magic(mmm.MAGIC_MIME_TYPE | mmm.MAGIC_MIME_ENCODING);
var fs = require("fs");


var checkFiles = function (file, maxSize, callback) {
	if (typeof file === 'string') { 
		fs.stat(file, function(err, stat) {
		    if (err == null) {
		        var stats = fs.statSync(file);
		 		var fileSizeInBytes = stats["size"] ? stats["size"] : null;
				var fileSize = fileSizeInBytes / 1000000.0;
				if (fileSize && fileSize <= maxSize) {
			  		magic.detectFile(file, function(err, result) {
				      	if (err) // Cant Detect File Type
				      		callback('Cant Detect File Type', false);
				      	else if ((result.indexOf("image") >= 0) || (result.indexOf("video") >= 0)) //|| (result.indexOf("application/octet-stream") >= 0)) 
				      		callback(null, true);
				      	else // Not a video or image
				      		callback('File is not a video or image', false);
			  		});
			  	}
			  	else // SIZE > MaxSize
			  		callback('File is too big',false);
		    } 
		    else if (err.code == 'ENOENT') // File doesnt exist
		        callback('File does not exist', false); 
		    else // FILE ERROR
		        callback('Error file', false);
		});
	}
	else {
		callback('Error file', false);
	}
}


exports.checkFiles = checkFiles;