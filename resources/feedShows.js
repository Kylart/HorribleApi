/**
 * Created by Kylart on 02/05/2017.
 */

/**
 *
 * This definitely needs a better version
 * but we'll go with it as a starter
 *
 */

const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = 'http://horriblesubs.info/lib/getshows.php?type=show&showid='

let id = 898
let treated = 0
let empty = 0
const json = {}
const range = 902

const getUri = (id=1) => {
  return axios.get(BASE_URL + id).then(({data}) => {
        if (data === 'There are no individual episodes for this show.')
  {
    console.log('Empty id ' + id)
    ++empty
    ++treated
  }
else
  {
    let $ = cheerio.load(data)

    let name = $('.dl-label i').first().text().split(' ').slice(0, -3).join(' ').replace(' -', '')

    json[name] = id

    console.log(`${name} added with id ${id}.`)

    ++treated

    console.log(treated)

    if (treated === 898)
    {
      console.log('Over.')
      fs.writeFileSync('./shows.json', JSON.stringify(json), 'utf-8')
      process.exit(0)
    }
  }

}).catch((err) => {
    console.log('An error occurred on id ' + id + ': ' + err)
  ++treated
})
}

let i = 1

let main = setInterval(() => {
      console.log('Getting id ' + i)
getUri(i)

++i

if (i === range -1)
  clearInterval(main)
}, 150)
