const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, IntegrationApplication } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const wixua = require("croxydb")
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
const { channel } = require("diagnostics_channel");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });

    console.log(`[BOT] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)


client.on('interactionCreate', async (interaction) => {
  if(interaction.customId === "reklamver") {

    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;

    const reklam1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`demir`)
        .setLabel('Demir Paket')
        .setEmoji("🍁")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`altın`)
        .setLabel('Altın Paket')
        .setEmoji("🍁")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`elmas`)
        .setLabel('Elmas Paket')
        .setEmoji("🍁")
        .setStyle(ButtonStyle.Secondary)
    );

const embed = new EmbedBuilder()
.setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
.setDescription(`> Selam **${interaction.user.tag}**, Aşağıdaki paketlerden birini seçip reklamını yaptır.`)
.setColor("Blue")
.setFooter({text: "Wixua Tester"})

interaction.reply({embeds: [embed], ephemeral: true, components: [reklam1]})

}

if(interaction.customId === "demir") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
      },
    ],
  })

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(4)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Demir**`)
  .setFooter({text: "Wixua Tester"})
  .setColor("Blue")

  interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})

  wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id })

}

if(interaction.customId === "odeme") {

  const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`papara`)
      .setLabel('Papara')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`ininal`)
      .setLabel('İninal')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`ziraat`)
      .setLabel('Ziraat')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: "Ödeme Yöntemleri", iconURL: client.user.avatarURL()})
  .setDescription("> Aşağıdaki butonları kullanarak **ödeme yönteminizi** seçiniz.")
  .setFooter({text: "Wixua Tester"})
  .setColor("Blue")

  interaction.reply({embeds: [embed], components: [row], ephemeral: true})

}

if(interaction.customId === "papara") {

  const papara = new EmbedBuilder()
  .setAuthor({name: "Papara Ödeme"})
  .setDescription("**Papara no:** 1973505086\n**Ad Soyad:** M... A...")
  .setThumbnail("https://cdn.discordapp.com/attachments/1114479978826956810/1114482707104268328/download.png")
  .setFooter({text: "Wixua Tester"})
  .setColor("Green")

  interaction.reply({embeds: [papara], ephemeral: true})
}
if(interaction.customId === "ininal") {

  const ininal = new EmbedBuilder()
  .setAuthor({name: "İninal Ödeme"})
  .setDescription("**İninal no:** 1839043448234\n**Ad Soyad:** A... A...")
  .setThumbnail("https://cdn.discordapp.com/attachments/1114479978826956810/1114484094630383656/download.png")
  .setFooter({text: "Wixua Tester"})
  .setColor("Green")

  interaction.reply({embeds: [ininal], ephemeral: true})
}
if(interaction.customId === "ziraat") {

  const ziraat = new EmbedBuilder()
  .setAuthor({name: "Ziraat Ödeme"})
  .setDescription("**Ziraat no:** TR00......\n**Ad Soyad:** M... A...")
  .setThumbnail("https://cdn.discordapp.com/attachments/1114479978826956810/1114485169198473216/images.png")
  .setFooter({text: "Wixua Tester"})
  .setColor("Green")

  interaction.reply({embeds: [ziraat], ephemeral: true})
}

if(interaction.customId === "altın") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
      },
    ],
  })

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(4)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )
  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Altın**`)
  .setFooter({text: "Wixua Tester"})
  .setColor("Blue")

  interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})

  wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id })

}
if(interaction.customId === "elmas") {

  if (!interaction.guild) return;

  const { user, customId, guild } = interaction;

  const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);

  const channel = await guild.channels.create({
    name: `reklam-${user.username}`,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
       {
        id: user.id,
        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
      },
    ],
  })

  const odeme = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`kapat`)
      .setLabel('Kapat')
      .setEmoji("🔒")
      .setStyle(4)
  )
  .addComponents(
    new ButtonBuilder()
      .setCustomId(`odeme`)
      .setLabel('Ödeme Yöntemi')
      .setEmoji("💸")
      .setStyle(ButtonStyle.Secondary)
  )

  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Elmas**`)
  .setFooter({text: "Wixua Tester"})
  .setColor("Blue")

  interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
  channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})

  wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id})

}
if(interaction.customId === "kapat") {

  interaction.channel.delete()
}
})