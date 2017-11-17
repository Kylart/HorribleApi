const test = require('ava')
const main = require('../src')

test('Naruto Shippudden > 480p > should give 266 results', async t => {
  try {
    const res = await main.getMagnetsFromAnimeName({
      name: 'Naruto Shippuuden',
      quality: '480p'
    })

    t.is(res.length, 266)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('Naruto Shippudden > 720p > should give 263 results', async t => {
  try {
    const res = await main.getMagnetsFromAnimeName({
      name: 'Naruto Shippuuden',
      quality: '720p'
    })

    t.is(res.length, 263)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('Naruto Shippudden > 1080p > should give 255 results', async t => {
  try {
    const res = await main.getMagnetsFromAnimeName({
      name: 'Naruto Shippuuden',
      quality: '1080p'
    })

    t.is(res.length, 255)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('Mahou Shoujo Ikusei Keikaku > 480p > should give 12 results', async t => {
  try {
    const res = await main.getMagnetsFromAnimeName({
      name: 'Mahou Shoujo Ikusei Keikaku',
      quality: '480p'
    })

    t.is(res.length, 12)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('Mahou Shoujo Ikusei Keikaku > 720p > should give 12 results', async t => {
  try {
    const res = await main.getMagnetsFromAnimeName({
      name: 'Mahou Shoujo Ikusei Keikaku',
      quality: '720p'
    })

    t.is(res.length, 12)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('Mahou Shoujo Ikusei Keikaku > 1080p > should give 12 results', async t => {
  try {
    const res = await main.getMagnetsFromAnimeName({
      name: 'Mahou Shoujo Ikusei Keikaku',
      quality: '1080p'
    })

    t.is(res.length, 12)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})
