const expect = require('expect')
const { generateMessage } = require('./message')


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