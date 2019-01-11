const expect = require('expect');

var {
    generateMessage,
    generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let result = generateMessage('micheal', 'hey');
        expect(result.from).toBe('micheal');
        expect(result.text).toBe('hey');
        expect(typeof result.createAt).toBe('number');

    })
})

describe('generateLocationMessage', () => {
    it('should generate correct localtion url', () => {
        let result = generateLocationMessage('Deb', 1, 1);
        expect(result.url).toBe('https://www.google.com/maps?q=1,1');
        expect(result.from).toBe('Deb');
        expect(typeof result.createAt).toBe('number');
    })
})