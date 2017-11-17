const {join} = require('path')

const axios = require('axios')
const cheerio = require('cheerio')

const _BASE_URL_ = 'http://horriblesubs.info/lib/'
const _SEARCH_URL_ = _BASE_URL_ + 'getshows.php?type=show&showid='

const showsJSON = require(join(__dirname, '..', 'resources', 'getShows.js')).getShows()
const showsOnly = Object.keys(showsJSON)

const getShowsJSON = () => {
  return showsJSON
}

const getShowsOnly = () => {
  return showsOnly
}

const getNumberOfShows = () => {
  return showsOnly.length
}

const getMagnetsFromURI = (fromEp, untilEp, quality, uri) => {
  return new Promise((resolve, reject) => {
    const result = []

    axios.get(uri).then(({data, status}) => {
      if (status !== 200) reject(new Error('[HorribleApi]: Could not reach horriblesubs.info'))

      const $ = cheerio.load(data)

      $('.release-links').each(function () {
        const quality_ = $(this).find('td.dl-label i').text().split(' ').slice(-1)[0].replace('[', '').replace(']', '')

        if (quality_ === quality) {
          const ep = parseInt($(this).find('td.dl-label i').text().split(' ').slice(-2, -1)[0])

          if (ep <= untilEp && ep >= fromEp) {
            const link = $(this).find('td.hs-magnet-link span.dl-link a').attr('href')

            result.push(link)
          }
        }
      })

      resolve(result)
    }).catch((err) => {
      console.log('[HorribleApi]: An error occurred while reaching horriblesubs.info...\n' + err)
    })
  })
}

let nextid = 0
let result = []

const getMagnetsFromAnimeName = (data) => {
  /**
   * Get the magnets from the named anime in told quality
   *
   * Possible values for quality are
   *   - 480p
   *   - 720p
   *   - 1080p
   *
   * If name is not in shows.json, this will throw an error.
   */

  const quality = data.quality
  const name = data.name
  const fromEp = data.fromEp || 0
  const untilEp = data.untilEp || 20000

  return new Promise((resolve, reject) => {
    if (!['480p', '720p', '1080p'].includes(quality)) { reject(new Error('[HorribleApi]: Quality does not match!')) }

    if (!getShowsOnly().includes(name)) { reject(new Error('[HorribleApi]: Sorry, I do not know this name!')) }

    getMagnetsFromURI(fromEp, untilEp, quality, _SEARCH_URL_ + getShowsJSON()[name] + `&nextid=${nextid}`).then((links) => {
      if (links.length === 0) {
        resolve(result)

        // Resetting for next search
        result = []
        nextid = 0
      } else {
        result = [...result, ...links]
        ++nextid
        getMagnetsFromAnimeName(data).then((links) => {
          resolve(links)
        }).catch((err) => {
          throw err
        })
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

module.exports = {
  getShowsOnly,
  getNumberOfShows,
  getMagnetsFromAnimeName
}
