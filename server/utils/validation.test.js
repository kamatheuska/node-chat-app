const expect = require('expect')

const { isRealString } = require('./validation')

describe('isRealString', () => {
  it('should reject non string values', function() {
    expect(isRealString(123154)).toBe(false)
    expect(isRealString({name: 'nico'})).toBe(false)
  })
  it('should reject strings with only spaces', function() {
    expect(isRealString('    ')).toBe(false)
  })
  it('should allow strings with non-space characters', function() {
    expect(isRealString('45·$%asd')).toBe(true)
    expect(isRealString('45·$%  {} Niasd')).toBe(true)
    expect(isRealString('         45·$%  {} Niasd')).toBe(true)
  })
})