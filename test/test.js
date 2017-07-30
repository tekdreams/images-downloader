'use strict';
const download = require('../images-downloader.js').images,
validFiles = [ 'http://pbs.twimg.com/media/CZkz9-jUUAAWd3l.jpg:small',
  'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/12558483_1213523205344331_738628413_n.jpg',
  'http://uploadubqt.storage.googleapis.com/ubqt_56a8b55516f26dde42188f47:small.jpg' ],
invalidFiles = 'http://pbs.twimg.com/media/CZkz9-jUUAAWd3l.jpg:small',
validDirectory = __dirname + '/../mediatheque',
invalidDirectory = __dirname + "/mediatheque.jpg";


  describe('Test parameters', function() {
    it('should failed with invalid array', () => {
      return download(invalidFiles, validDirectory)
      .then(result => console.log('images Downloaded', result))
      .catch(error => console.log("download failed", error))
    });
    it('should failed with invalid directory', () => {
      return download(validFiles, invalidDirectory)
      .then(result => console.log('images Downloaded', result))
      .catch(error => console.log("download failed", error))
    });
  });
  describe('Test download images', function() {
    this.timeout(50000)
    it('should download images to mediatheque directory', () => {
      return download(validFiles, validDirectory)
      .then(result => console.log('images Downloaded', result))
      .catch(error => console.log("download failed", error))
    });
  });