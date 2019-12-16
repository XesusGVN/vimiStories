module.exports.onCallback = function(){
    global.bot.on('callback_query', function(msg){
        console.log(msg);
    });
}