
module.exports.onMessage = function(){
    const logger = require('../../logs/logfunc');
    global.bot.on('message', (msg) => {
        var bot = global.bot;
        bot.sendMessage(msg.from.id, msg.text);

        logger.log("@" + msg.from.username + ": " + msg.text);
    });
}
