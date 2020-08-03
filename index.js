const TelegramBot = require ('node-telegram-bot-api');
const dialogflow = require('./dialogflow');

/*const token = 'inserir o token do BOT do telegram e apagar as marcações de comentário';*/

const bot = new TelegramBot (token, { polling: true });

bot.on ('message',async function (msg) {
    const chatId = msg.chat.id;
   
    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;
    console.log(msg.text)

    if (dfResponse.intent === 'churrasco'){
        responseText = "Quantas pessoas?";
    } else if (dfResponse.intent !== "Default Welcome Intent"){ 
        responseText = parseInt(msg.text);
        responseText = 0.40*responseText + "kg de carne, sendo:" + "\n" + "- " + (0.40*responseText)*0.5 + "kg carne bovina;" + "\n"
        + "- " + (0.40*responseText)*0.25 + "kg de frango;" + "\n" + "- " + (0.40*responseText)*0.25 + "kg de linguiça." + "\n" +
        'Obs.: talvez seja interessante adicionar mais ' + responseText/5 + ' pacote(s) de pão de alho' + "\n" + "Entre no site www.carrefour.com.br e encontre todos os produtos por um preço especial."
    }
    
    bot.sendMessage(chatId, responseText);

});
