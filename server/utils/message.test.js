const expect = require('expect')
const { generateMessage, generateLocationMessage } = require('./message')


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store res in variable
    let msg = generateMessage('Nico', 'This is a test')
    // assert from match
    expect(msg.from).toBe('Nico')
    // assert text match
    expect(msg.text).toBe('This is a test')
    // assert createdAt is number
    expect(msg.createdAt).toBeA('number')
    let message = generateMessage()
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let lat = 23.2312, long = -12.1299
    let locationMsg = generateLocationMessage('Admin', lat, long)

    expect(locationMsg.createdAt).toBeA('number')
    expect(locationMsg.url).toBe(`https://www.google.com/maps?q=${lat},${long}`)
  })
})