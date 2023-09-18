const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {

    const money = args[0];

    const authorMemberBan$ = db.get(`ban_${message.author.id}`)

    const authorBanned = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Sistemden yasaklandığınız için işleminiz gerçekleştirilemiyor.")

    if (authorMemberBan$) return message.reply({ embeds: [authorBanned] })

    const nomoney = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Kumar da katlamak istediğin para miktarını girmelisin.")

    if (!money) return message.reply({ embeds: [nomoney] })
    if (isNaN(money)) return message.reply({ embeds: [nomoney] })
    if (money === 0) return message.reply({ embeds: [nomoney] })

    const author_money = db.get(`money_${message.author.id}`);

    const authormoney_no = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`Yeterli paranız bulunmamaktadır \`[${author_money}]\``)

    if (author_money < money) return message.reply({ embeds: [authormoney_no] })

    var Money = money
    if (!money) Money = 1

    const mapping = ["true", "false"]
    const randomMapping = mapping[Math.floor(Math.random() * mapping.length)]

    if (randomMapping === "true") {
        const success = new Discord.EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`Tebrikler :tada: | **${money}** miktar para hesabınıza aktarıldı.`)

        db.add(`money_${message.author.id}`, money)
        return message.reply({ embeds: [success] })
    }

    if (randomMapping === "false") {
        const nosuccess = new Discord.EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`Oww :dizzy_face: | **${money}** miktar para hesabınızdan çekildi.`)

        db.add(`money_${message.author.id}`, -money)
        return message.reply({ embeds: [nosuccess] })
    }
};
exports.conf = {
    aliases: ["rollvs", "rol-vs"]
};

exports.help = {
    name: "rolvs"
};