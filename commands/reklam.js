const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const wixua = require("croxydb");
module.exports = {
  name: "reklam",
  description: "Botun pingini gösterir!",
  type: 1,
  options: [],
  run: async (client, interaction) => {

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji(`📢`)
            .setLabel(`Reklam Ver`)
            .setStyle(2)
            .setCustomId("reklamver")
    )

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, false)) {
      return interaction.reply({ content: "❌ **|** Bu komutu kullanmak için **gerekli izinleri** karşılayamıyorsun.", ephemeral: true })
    }

    const server = interaction.guild

const embed = new EmbedBuilder()
.setAuthor({name: "Reklam Paneli", iconURL: server.iconURL({ dynmaic: true })})
.setDescription("> **Reklam paneline hoşgeldiniz aşağıdaki butonları kullanarak paketlerden yararlanabilirsiniz**\n\n**1- Demir Paket 10₺**\n\n1.Yeni kanal açılıp kanala mesajınız atılır.\n\n**2- Altın Paket ₺30**\n\n1.@everyone atma izni\n\n**3- Elmas Paket ₺50**\n\n1.Her 30dk @everyone atılır.")
.setColor("Aqua")
.setFooter({text: "Wixua Tester", iconURL: interaction.user.avatarURL()})

interaction.reply({content: "✅ | Mesaj Gönderildi", ephemeral: true})
interaction.channel.send({embeds: [embed], components: [row]})

}
}
