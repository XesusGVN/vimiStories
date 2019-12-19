const USER      =  require('../../user/user');
const botFunc   =  require('../Functions/functions');

module.exports.onMessage = function(){
    const logger = require('../../logs/logfunc');
    global.bot.on('message', (msg) => {
        var bot  = global.bot;
        var id   = msg.from.id;
        var text = msg.text;
        // bot.sendMessage(msg.from.id, msg.text);
        var h_user = USER.haveUser(id);
        logger.log("@" + msg.from.username + ": " + msg.text);


        if (h_user == 1){
            // Если пользователь Зарегистрирован
            var USER_ACTION = USER.userAction(id);
            if(USER_ACTION == 'GET_YOUR_NAME'){
                if(!(text.length <= 3 || text.length >= 18 || typeof text == undefined || typeof text == "undefined")){
                    var setName = USER.setName(id,text);

                    if(setName == true){
                        USER.setAction(id,'GET_YOUR_CONTACT_DATA');
                        var options = {
                            "parse_mode": "html",
                            "reply_markup": JSON.stringify({
                                "resize_keyboard": true,
                                "keyboard": [
                                    [{ text: "🔰Отправить Контакт", request_contact: true }]
                                ],
                                "one_time_keyboard" : true
                            })
                        };
                        bot.sendMessage(id, "<b>Шаг 2: </b><i>Отправьте нам свои контактные данные</i>", options);
                    }
                }else{
                    bot.sendMessage(id,"<b>❌Ошибка: Укажите Действующее Имя пользователя</b>", {parse_mode: 'html'});
                }
            }else if(USER_ACTION == 'GET_YOUR_CONTACT_DATA'){
                if(msg.contact){
                    if(msg.contact.phone_number.length > 7){
                        var setContact = USER.setContact(msg.contact);

                        if(setContact){
                            // Вызов Главного Меню
                            USER.setAction(id,'DEFAULT');  
                            
                            var info = USER.getInfo(id);
                            logger.regLog(info)
                            
                            bot.sendMessage(id, "<b>✅Вы успешно Зарегистрировались</b>", {parse_mode: 'html'});
                            botFunc.getMainMenu(id);
                        }
                    }else{
                        bot.sendMessage(id,"<b>❌Ошибка: Укажите в настройках аккаунта Telegram номер мобильного телефона</b>", {parse_mode: 'html'});
                    }
                }else{
                    USER.setAction(id,'GET_YOUR_CONTACT_DATA');
                        var options = {
                            "parse_mode": "html",
                            "reply_markup": JSON.stringify({
                                "resize_keyboard": true,
                                "keyboard": [
                                    [{ text: "🔰Отправить Контакт", request_contact: true }]
                                ],
                                "one_time_keyboard" : true
                            })
                        };
                        bot.sendMessage(id, "<b>Ничего писать не нужно</b>, <i>просто нажмите кнопку </i> <b>🔰Отправить Контакт</b>", options);
                }
            }else if(text == '/start'){
                botFunc.getMainMenu(id);
            }
        }else{
            if(text == '/start'){
                // Зарегистрировать
                var reg = USER.regUser(msg.from);
            
                if(reg == 1){
                    bot.sendMessage(id,`<b>Шаг 1:</b> <i>Укажите своё настоящее имя</i>
<b>Например:</b> <i>Эдуард</i>
                    `, {parse_mode: 'html'});

                    USER.setAction(id,'GET_YOUR_NAME');
                }
            }else{
                bot.sendMessage(id,"<b>‼️Вы не зарегистрированны в системе, для регистрации пропишите /start</b>", {parse_mode: 'html'});
            }
        }
    });
}
