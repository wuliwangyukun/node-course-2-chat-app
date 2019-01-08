const generateMessage = function (from, message) {
    return {
        from,
        message,
        createAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}