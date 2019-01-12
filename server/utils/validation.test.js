const expect = require('expect');
var {
    isReallyString
} = require('./validation');

describe('is really string', () => {
    it('should reject non-string values', () => {
        var res = isReallyString(98);
        expect(res).toBe(false)
    })

    it('should reject string with only spaces', () => {
        var res = isReallyString('   ');
        expect(res).toBe(false)
    })

    it('should allow string with non-space charecters', () => {
        var res = isReallyString('  qyk  ');
        expect(res).toBe(true)
    })
})