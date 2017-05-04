# HorribleApi
[![Build Status](https://travis-ci.org/Kylart/HorribleApi.svg?branch=master)](https://travis-ci.org/Kylart/HorribleApi)
 
This is an api allowing one to gather torrents directly from horriblesubs.info in around half a second.

HorribleApi is being developed mainly for KawAnime (rip Nyaa...) but anyone can use it for its own purpose.

Any contribution is welcomed.

# Installation
```
npm install --save horrible-api
```

# Use
```javascript
const horribleApi = require('horrible-api')
 
// Want to get a list of all available anime ?
console.log(horribleApi.getShowsOnly())

// Want to know how many shows are avaible at the moment ?
console.log(horribleApi.getNumberOfShows())

// Want to get the 18 latest releases from Horrible subs ?
const quality = '720p' // Can be 480p, 720p or 1080p. Something else will throw an error.
 
horribleApi.getLatest(quality).then((releases) => {
  console.log(releases)
}).catch((err) => {
  console.log(err)
})
```

```javascript
// Want to get magnets for an anime ?
 
horribleApi.getMagnetsFromAnimeName({
  fromEp: 0,
  untilEp: 500,
  name: 'Absolute Duo',   // Show must in horribleApi.getShowsOnly()
  quality: '720p'  // Can be 480p, 720p or 1080p. Something else will throw an error.
}).then((links) => {
  console.log(links.length)
}).catch((err) => {
  console.log(err)
})
```

# Dev
```
npm test
```


# Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request.

# License

MIT License

Copyright (c) Kylart