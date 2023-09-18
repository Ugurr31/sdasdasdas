const Discord = require('discord.js');
const config = require("../config.js")
let prefix = config.prefix
exports.run = async (client, message, args) => {

  const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `${message.author.username} | Yardım Menüsü`, iconURL: message.author.displayAvatarURL() })
    .addFields(
      { name: `${prefix}send`, value: 'İstediğiniz kullanıcıya para gönderirsiniz.' },
      { name: `${prefix}param`, value: 'Toplam paranıza bakarsınız.' },
      { name: `${prefix}rolvs`, value: 'Kumar oynayarak paranızı katlarsınız.' },
      { name: `${prefix}paraekle`, value: 'Yöneticiler istedikleri üyeye para ekleyebilirler.' },
      { name: `${prefix}parasil`, value: 'Yöneticiler istedikleri üyeden para silebilirler.' },
      { name: `${prefix}botban`, value: 'Yöneticiler istedikleri üyeyi sistemden yasaklayabilir.' },
      { name: `${prefix}botunban`, value: 'Yöneticiler istedikleri üyenin yasağını kaldırabilir.' },
    )
    .setColor("Green")

  return message.channel.send({ embeds: [embed] });

};
exports.conf = {
  aliases: ["help"]
};

exports.help = {
  name: "yardım"
};