# HorribleApi

This is an api allowing one to gather torrents directly from horriblesubs.info in around half a second.

HorribleApi is being developed mainly for KawAnime (rip Nyaa...) but anyone can use it for its own purpose.

Any contribution is welcomed.

# Use
```javascript
const horribleApi = require('horrible-api')
 
// Want to get a list of all available anime ?
console.log(horribleApi.getShowsOnly)
 
// Want to get the 18 latest releases from Horrible subs ?
const quality = '720p' // Can be 480p, 720p or 1080p. Something else will throw an error.
 
horribleApi.getLatest(quality).then((releases) => {
  console.log(releases)
}).catch((err) => {
  console.log(err)
})
```
