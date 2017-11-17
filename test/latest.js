const test = require('ava')
const main = require('../src')

test('480p > should give 18 results', async t => {
  try {
    const res = await main.getLatest('480p')

    t.is(res.length, 18)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('720p > should give 18 results', async t => {
  try {
    const res = await main.getLatest('720p')

    t.is(res.length, 18)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})

test('1080p > should give 18 results', async t => {
  try {
    const res = await main.getLatest('1080p')

    t.is(res.length, 18)
  } catch (e) {
    console.error(e)
    t.fail()
  }
})
