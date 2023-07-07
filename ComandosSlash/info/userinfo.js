const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    description: "[Informações] Veja informações de algum usuario",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "ID ou Menção do usuario",
            type: Discord.ApplicationCommandOptionType.User,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser("user")

        let ryan = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .addFields(
                {
                    name: `🎫 Nome do usuario`,
                    value: `\`\`\`${user.tag}\`\`\``,
                    inline: true,
                },
                {
                    name: `🔎 ID do usuario`,
                    value: `\`\`\`${user.id}\`\`\``,
                    inline: true,
                },
                {
                    name: `🔔 Menção`,
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: `⏲️ Conta criada Em`,
                    value: `<t:${~~(user.createdTimestamp / 1000)}:f> (<t:${~~(user.createdTimestamp / 1000)}:R>)`,
                    inline: false,
                },
        )
        interaction.reply({ embeds: [ryan] })
    .catch(error => {
      console.error(error);
      interaction.reply(`Não foi possivel executar.`);
    });
    }
}