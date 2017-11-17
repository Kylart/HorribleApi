const axios = require('axios')
const cheerio = require('cheerio')

const _BASE_URL_ = 'http://horriblesubs.info/lib/'
const _LATEST_URL_ = _BASE_URL_ + 'latest.php'

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

  return new Promise((resolve, reject) => {
    const result = []

    if (!['480p', '720p', '1080p'].includes(quality)) { reject(new Error('[HorribleApi]: Quality does not match!')) }

    axios.get(_LATEST_URL_).then(({data, status}) => {
      if (status !== 200) reject(new Error('[HorribleApi]: Could not reach horriblesubs.info'))

      const $ = cheerio.load(data)

      $('.dl-label i').each(function () {
        const base = $(this).text().split(' ')

        const quality_ = base.slice(-1)[0].replace('[', '').replace(']', '')
        const name = '[HorribleSubs] ' + base.slice(0, -1).join(' ')

        if (quality_ === quality) {
          const parent = $(this).parent().parent()
          const magnetLink = parent.find('td.hs-magnet-link span a').attr('href')

          if (result.length < 18) {
            result.push({
              name: name,
              link: magnetLink
            })
          }
        }
      })

      resolve(result)
    }).catch((err) => {
      console.log('[HorribleApi]: An error occurred while reaching horriblesubs.info...\n' + err)
    })
  })
}

module.exports = {
  getLatest
}
