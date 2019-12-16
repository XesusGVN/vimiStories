

module.exports.onMessage = function(){
    const logger = require('../../logs/logfunc');
    global.bot.on('message', (msg) => {
        var bot = global.bot;
        logger.log(msg.text);
        bot.sendMessage(msg.from.id, msg.text);
    });
}
