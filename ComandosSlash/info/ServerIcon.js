const Discord = require("discord.js")

module.exports = {
    name: "servericon",
    description: "[Informações] Veja a capa do servidor.",
    type: Discord.ApplicationCommandType.ChatInput,
  
    run: async (client, interaction) => {

        let icon = new Discord.EmbedBuilder()
            .setTitle(`${interaction.guild.name}`)
            .setDescription(`Icon do servidor:`)
            .setImage(`${interaction.guild.iconURL({ dynamic: true })}`)
            .setColor("Black")
 
            interaction.reply({ embeds: [icon]})
    .catch(error => {
      console.error(error);
      interaction.reply(`Não foi possível enviar a mensagem em ${canal}.`);
    });


    }
}         