const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const money = args[1];

    const nomember = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Para göndermek istediğiniz kullanıcıyı etiketleyiniz.")

    if (!member) return message.reply({ embeds: [nomember] })

    const authorMemberBan$ = db.get(`ban_${message.author.id}`)
    const memberBan$ = db.get(`ban_${member.id}`)

    const authorBanned = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Sistemden yasaklandığınız için işleminiz gerçekleştirilemiyor.")

    if (authorMemberBan$) return message.reply({ embeds: [authorBanned] })

    const memberBanned = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`${member} kişisi sistemden yasaklandığı için işlem sağlanamaz.`)

    if (memberBan$) return message.reply({ embeds: [memberBanned] })

    const nomoney = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Kullanıcıya göndermek istediğiniz para miktarını giriniz.")

    if (!money) return message.reply({ embeds: [nomoney] })

    const author_money = db.get(`money_${message.author.id}`);

    const noauthormoney = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription("Hiç paranız bulunmamaktadır.")

    if (!author_money) return message.reply({ embeds: [noauthormoney] })
    if (author_money === 0) return message.reply({ embeds: [noauthormoney] })

    const authormoney_no = new Discord.EmbedBuilder()
        .setColor("Red")
        .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`Yeterli paranız bulunmamaktadır \`[${author_money}]\``)

    if (author_money < money) return message.reply({ embeds: [authormoney_no] })

    const successembed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: `${message.author.username} ⏩ ${member.username}`, iconURL: message.author.displayAvatarURL() })
        .setDescription(`${member} kişisine para gönderim işleminiz **FAST** ile yapıldı!`)
        .addFields(
            { name: "\u200B", value: `__${money}__ miktar bakiye gönderildi`, inline: true },
            { name: "\u200B", value: `**${Number(author_money || 0) - Number(money)}** miktar bakiyeniz kaldı`, inline: true }
        )

    db.add(`money_${member.id}`, money)
    db.add(`money_${message.author.id}`, -money)
    message.reply({ embeds: [successembed] })
};
exports.conf = {
    aliases: ["gönder", "gonder"]
};

exports.help = {
    name: "send"
};