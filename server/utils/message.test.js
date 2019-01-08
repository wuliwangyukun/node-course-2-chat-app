const expect = require('expect');

var {
    generateMessage
} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let result = generateMessage('micheal', 'hey');
        expect(result.from).toBe('micheal');
        expect(result.message).toBe('hey');
        expect(typeof result.createAt).toBe('number');

    })
})