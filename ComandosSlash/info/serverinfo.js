const Discord = require("discord.js")

module.exports = {
    name: "serverinfo",
    description: "[Informações] Veja as informações do servidor.",
    type: Discord.ApplicationCommandType.ChatInput,
  
    run: async (client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let servidor = interaction.guild;

        let chats = interaction.guild.channels.cache.filter(a => a.type === "GUILD_TEXT").size;
        let calls = interaction.guild.channels.cache.filter(a => a.type === "GUILD_VOICE").size;

        let emojis = interaction.guild.emojis.cache.size;
        let dono_id = interaction.guild.ownerId;
        let dono = interaction.guild.members.cache.get(dono_id);
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");

        let embed = new Discord.EmbedBuilder()
        .setColor("fff4a2")
        .setTitle(`${interaction.guild.name}`)
        .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
        .addFields(
            {
                name: ` 📌 **|** Principais:`,
                value: `Dono: ${dono}\nMembros: \`${membros + 1}\`\nImpulsos: \`${impulsos}\`\nID: \`${servidor.id}\``,
                inline: false
            },
            {
                name: `💼 **|** Cargos:`,
                value: `\`${cargos}\``,
                inline: true
            },
            {
                name: `😎 **|** Emojis:`,
                value: `\`${emojis}\``,
                inline: true
            },
            {
                name: `📅 **|** Data de criação:`,
                value: `\`${data}\``,
                inline: false
            },
        );

        interaction.reply({ embeds: [embed] })
    .catch(error => {
      console.error(error);
      interaction.reply(`Erro ao executar comando.`);
    });

       
        
    }
}