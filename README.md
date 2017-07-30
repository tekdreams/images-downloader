[![Build Status](https://travis-ci.org/tekdreams/images-downloader.svg?branch=master)](https://travis-ci.org/tekdreams/images-downloader)

Images downloader 
=================

A Node.js module for downloading a single image or multiple images to disk from a given Url (checking if urls exist and detecting image type)

## Prerequisites

Node.js - Version >=4.3.2

## Installation

Use npm:

```
$ npm install images-downloader --save
```
Or you can clone and install HEAD:

```
git clone https://github.com/tekdreams/images-downloader.git
cd images-downloader
npm install
```

## Usage

```
const download = require('images-downloader').images;

// The file will be downloaded to this directory. For example: __dirname + '/mediatheque'
const dest = 'path/to/dest'

// An array of image(s) to download
const images = ['http://url.com/image1.jpg',
	'http://url.com/image2.png',
	'http://url.com/image3.gif']
```

To download your single or multiple images use the following...

```
download(images, dest)
.then(result => {
	console.log('Images downloaded', result);	
})
.catch(error => console.log("downloaded error", error))
```

The `result` returned in from the promise will be a `Result` array.


## Returned Data

The module returns an array. Below is an example:

```
 [{ filename: 'path/to/image_3233.jpeg',
    status: 'downloaded',
    url: 'http://url.com/image1.jpg' },
  { filename: null,
    status: 'Images allowed only',
    url: 'http://url.com/image1.jpg' }]
```

## Tests

  `npm test`


## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

Copyright © 2017 Tekdreams. [MIT Licensed](LICENSE).