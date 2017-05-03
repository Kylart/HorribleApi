const assert = require('assert')
const expect = require('chai').expect
const path = require('path')

const main = require(path.join(__dirname, '..', 'index.js'))

describe('Getting latest releases', () => {
  describe('at 480p quality', () => {
    it('should give 18 results', function () {
      this.timeout(1000)

      return main.getLatest('480p').then((result) => {
        expect(result).to.have.length(18)
      })
    })
  })

  describe('at 720p quality', () => {
    it('should give 18 results', function () {
      this.timeout(1000)

      return main.getLatest('720p').then((result) => {
        expect(result).to.have.length(18)
      })
    })
  })

  describe('at 1080p quality', () => {
    it('should give 18 results', function () {
      this.timeout(1000)

      return main.getLatest('1080p').then((result) => {
        expect(result).to.have.length(18)
      })
    })
  })
})

describe('Getting shows', () => {
  describe('Naruto Shippuuden', () => {
    describe('at 480p quality', () => {
      it('should give 266 results', function () {
        this.timeout(4000)

        return main.getMagnetsFromAnimeName({
          name: 'Naruto Shippuuden',
          quality: '480p'
        }).then((links) => {
          expect(links).to.have.length(266)
        })
      })
    })

    describe('at 720p quality', () => {
      it('should give 263 results', function () {
        this.timeout(4000)

        return main.getMagnetsFromAnimeName({
          name: 'Naruto Shippuuden',
          quality: '720p'
        }).then((links) => {
          expect(links).to.have.length(263)
        })
      })
    })

    describe('at 1080p quality', () => {
      it('should give 255 results', function () {
        this.timeout(4000)

        return main.getMagnetsFromAnimeName({
          name: 'Naruto Shippuuden',
          quality: '1080p'
        }).then((links) => {
          expect(links).to.have.length(255)
        })
      })
    })
  })

  describe('Mahou Shoujo Ikusei Keikaku', () => {
    describe('at 480p quality', () => {
      it('should give 12 results', function () {
        this.timeout(4000)

        return main.getMagnetsFromAnimeName({
          name: 'Mahou Shoujo Ikusei Keikaku',
          quality: '480p'
        }).then((links) => {
          expect(links).to.have.length(12)
        })
      })
    })

    describe('at 720p quality', () => {
      it('should give 12 results', function () {
        this.timeout(4000)

        return main.getMagnetsFromAnimeName({
          name: 'Mahou Shoujo Ikusei Keikaku',
          quality: '720p'
        }).then((links) => {
          expect(links).to.have.length(12)
        })
      })
    })

    describe('at 1080p quality', () => {
      it('should give 12 results', function () {
        this.timeout(4000)

        return main.getMagnetsFromAnimeName({
          name: 'Mahou Shoujo Ikusei Keikaku',
          quality: '1080p'
        }).then((links) => {
          expect(links).to.have.length(12)
        })
      })
    })
  })
})