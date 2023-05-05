require("dotenv").config()
const axios = require("axios")
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true });

// 监听消息
bot.onText(/\/bot /, async (msg) => {
    // 群聊ID
    const chatId = msg.chat.id
    // 接收到的消息
    const prompt = msg.text
    // 是否是群组消息
    const isGroup = msg.chat.type.indexOf("group") != -1
    // 回复消息的消息id
    const reply_to_message_id = msg.message_id

    // 构造一个按钮对象
    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: "广告招聘！！！！！🎈",
                    url: "www.baidu.com"
                },
                {
                    text: "广告招聘！！！！！🎈",
                    url: "www.baidu.com"
                },
                {
                    text: "广告招聘！！！！！🎈",
                    url: "www.baidu.com"
                },
                {
                    text: "广告招聘！！！！！🎈",
                    url: "www.baidu.com"
                }
            ]
        ]
    };

    // 判断是不是群聊
    if (isGroup) {

        // 判断在不在白名单内
        if (!process.env.TG_WHITE_LIST.includes(msg.chat.title)) return bot.leaveChat(chatId)// 不在白名单退出群聊

        // 请求接口 这是一个转发接口,如果无需要请自行修改
        // const { data: { message } } = await axios.post("你的地址", { 请求参数 })

        // 发送消息
        bot.sendMessage(chatId, `${message} \n \n <b>—————————————</b> \n | 广告位招聘 \n | 广告位招聘 \n | 广告位招聘 \n | 广告位招聘`, { parse_mode: "html", reply_to_message_id, allow_sending_without_reply: true, reply_markup: JSON.stringify(keyboard) })

    } else {

        // 发送消息
        bot.sendMessage(chatId, "暂未此模式,如有需要请联系群主~ \n \n --------------- \n | 广告位招聘 \n | 广告位招聘 \n | 广告位招聘 \n | 广告位招聘", { parse_mode: "html", reply_to_message_id, allow_sending_without_reply: true, reply_markup: JSON.stringify(keyboard) })

    }

});
