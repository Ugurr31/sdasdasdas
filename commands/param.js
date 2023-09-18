const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {

    const authorMemberBan$ = db.get(`ban_${message.author.id}`)

    const authorBanned = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Sistemden yasaklandığınız için işleminiz gerçekleştirilemiyor.")

    if (authorMemberBan$) return message.reply({ embeds: [authorBanned] })

    const author_money = db.get(`money_${message.author.id}`);

    const noauthormoney = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Hiç paranız bulunmamaktadır.")

    if (!author_money) return message.reply({ embeds: [noauthormoney] })
    if (author_money === 0) return message.reply({ embeds: [noauthormoney] })

    const successembed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`**${author_money}** miktar bakiyeniz mevcut!`)
        .setThumbnail(message.author.displayAvatarURL())
    // lourity
    message.reply({ embeds: [successembed] })
};
exports.conf = {
    aliases: ["bakiyem", "coinim"]
};

exports.help = {
    name: "param"
};