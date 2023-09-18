const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const Discord = require("discord.js")
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});


module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token || process.env.TOKEN)

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id === config.chat_channelId) {

    db.add(`message_count_${message.guild.id}`, 1)

    const messageCount = db.get(`message_count_${message.guild.id}`)

    if (messageCount + 1 === 30) { // kaç mesajda ödülün gelmesini istiyorsanız ayarlayın (30 yazan kısmı değiştirmelisin)
      db.delete(`message_count_${message.guild.id}`)

      const lourity = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setEmoji("🎉")
            .setLabel("Ödül için tıkla!")
            .setStyle(ButtonStyle.Success)
            .setCustomId("reward_button")
        )

      const rewardEmbed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: `${message.guild.name}`, iconURL: message.guild.iconURL() })
        .setDescription(`Aşağıdaki butona **ilk tıklayana** bakiye ödülü! :tada:`)

      client.channels.cache.get(config.chat_channelId).send({ embeds: [rewardEmbed], components: [lourity] })
    }
  }
})


client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "reward_button") {
    const louriity_update = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setEmoji("🎉")
          .setLabel("Ödül için tıkla!")
          .setStyle(ButtonStyle.Success)
          .setCustomId("reward_button")
          .setDisabled(true)
      )

    const mapping = ["8", "18", "38", "120", "4", "84", "26", "31", "29", "49", "51"] // butona tıklayana verilecek random ödüller
    const randomMapping = mapping[Math.floor(Math.random() * mapping.length)]

    const rewardEmbed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`Tebrikler **${interaction.user.username}** :tada: | **${randomMapping}** miktar bakiye kazandın!`)

    db.add(`money_${interaction.user.id}`, randomMapping)
    interaction.update({ content: `${interaction.user}`, embeds: [rewardEmbed], components: [louriity_update] })
  }
})