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

    const nomember = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Yasağını kaldırmak istediğiniz kullanıcıyı etiketleyiniz.")

    if (!member) return message.reply({ embeds: [nomember] })

    const successembed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`${member} kişisinin sistem yasağı kaldırıldı!`)

    db.delete(`ban_${member.id}`)
    message.reply({ embeds: [successembed] })
};
exports.conf = {
    aliases: ["bot-unban"]
};

exports.help = {
    name: "botunban"
};