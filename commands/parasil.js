const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {

    const noperm = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Yeterli yetkiye sahip değilsiniz.")

    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply({ embeds: [noperm] })

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const money = args[1];

    const nomember = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Para çekmek istediğiniz kullanıcıyı etiketleyiniz.")

    if (!member) return message.reply({ embeds: [nomember] })

    const nomoney = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Kullanıcıdan çekmek istediğiniz para miktarını giriniz.")

    if (!money) return message.reply({ embeds: [nomoney] })
    if (isNaN(money)) return message.reply({ embeds: [nomoney] })

    const author_money = db.get(`money_${member.id}`);

    const successembed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`${member} kişisine para çekim işlemi **FAST** ile yapıldı!`)
        .addFields(
            { name: "\u200B", value: `__${money}__ miktar bakiye silindi`, inline: true },
            { name: "\u200B", value: `**${Number(author_money) - Number(money)}** miktar bakiyesi mevcut`, inline: true }
        )

    db.add(`money_${member.id}`, -money)
    message.reply({ embeds: [successembed] })
};
exports.conf = {
    aliases: ["para-sil"]
};

exports.help = {
    name: "parasil"
};