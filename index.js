/**
 * Created by Kylart on 02/05/2017.
 */

const {join} = require('path')

const axios = require('axios')
const cheerio = require('cheerio')

const _BASE_URL_ = 'http://horriblesubs.info/lib/'
const _SEARCH_URL_ = _BASE_URL_ + 'getshows.php?type=show&showid='
const _LATEST_URL_ = _BASE_URL_ + 'latest.php'

const showsJSON = require(join(__dirname, 'resources', 'getShows.js')).getShows()
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

const getLatest = (quality) => {
  /**
   * Get the 18 latest releases from HorribleSubs and reports
   * their name and magnet links
   *
   * Possible values for quality are
   *   - 480p
   *   - 720p
   *   - 1080p
   */

  if (!['480p', '720p', '1080p'].includes(quality))
    throw '[HorribleApi]: Quality does not match!'

  return new Promise((resolve, reject) => {
    const result = []

    axios.get(_LATEST_URL_).then(({data, status}) => {
      if (status !== 200) reject('[HorribleApi]: Could not reach horriblesubs.info')

      const $ = cheerio.load(data)

      $('.dl-label i').each(function () {
        const base = $(this).text().split(' ')

        const quality_ = base.slice(-1)[0].replace('[', '').replace(']', '')
        const name = '[HorribleSubs] ' + base.slice(0, -3).join(' ')

        if (quality_ === quality)
        {
          const parent = $(this).parent().parent()
          const magnetLink = parent.find('td.hs-magnet-link span a').attr('href')

          if (result.length < 19)
            result.push({
              name: name,
              link: magnetLink
            })
        }
      })

      resolve(result)
    }).catch((err) => {
      console.log('[HorribleApi]: An error occurred while reaching horriblesubs.info...\n' + err)
    })
  })
}

const getMagnetsFromURI = (fromEp, untilEp, quality, uri) => {
  return new Promise((resolve, reject) => {
    const result = []

    axios.get(uri).then(({data, status}) => {
      if (status !== 200) reject('[HorribleApi]: Could not reach horriblesubs.info')

      const $ = cheerio.load(data)

      $('.release-links').each(function () {
        const quality_ = $(this).find('td.dl-label i').text().split(' ').slice(-1)[0].replace('[', '').replace(']', '')

        if (quality_ === quality)
        {
          const ep = parseInt($(this).find('td.dl-label i').text().split(' ').slice(-2, -1)[0])

          if (ep <= untilEp && ep >= fromEp)
          {
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
let searching = false

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

  searching = true

  const quality = data.quality
  const name = data.name
  const fromEp = data.fromEp || 0
  const untilEp = data.untilEp || 20000

  if (!['480p', '720p', '1080p'].includes(quality))
    throw '[HorribleApi]: Quality does not match!'

  if (!getShowsOnly().includes(name))
    throw '[HorribleApi]: Sorry, I do not know this name!'

  return new Promise((resolve, reject) => {
    getMagnetsFromURI(fromEp, untilEp, quality, _SEARCH_URL_ + getShowsJSON()[name] + `&nextid=${nextid}`).then((links) => {
      if (links.length === 0)
      {
        resolve(result)
        searching = false

        // Resetting for next search
        result = []
        nextid = 0
      }
      else
      {
        result = [...result, ...links]
        ++nextid
        getMagnetsFromAnimeName(data).then((links) => {
          resolve(links)
        }).catch((err) => {
          throw err
        })
      }

    }).catch((err) => {
      reject('[HorribleApi]: An error occurred...' + err)
    })
  })
}

getMagnetsFromAnimeName({
  fromEp: 0,
  untilEp: 500,
  name: 'Ai-Mai-Mi',
  quality: '480p'
}).then((links) => {
  console.log(links.length)
}).catch((err) => {
  console.log(err)
})

module.exports = {
  getShowsOnly,
  getNumberOfShows,
  getLatest,
  getMagnetsFromAnimeName
}