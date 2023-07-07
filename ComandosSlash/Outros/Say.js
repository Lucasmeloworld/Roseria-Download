const Discord = require('discord.js')

module.exports = {
    name: "say",
    description: '[Outros] Me peça para enviar algo',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "texto",
            description: "Escreva o texto",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },

        {
            name: "canal",
            description: "selecione o canal",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        }

    ],
    run: async (client, interaction) => {
      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({content:`Você não possui permissão para utilizar este comando.`, ephemeral: true});
    } else {
     
        const texto = interaction.options.getString('texto');
        const canal = interaction.options.getChannel('canal');
  
  canal.send({content:` Autor da mensagem ${interaction.user} \n \n${texto}\ `})
    .then(() => {
      interaction.reply({content:`Mensagem \`${texto}\` enviada com sucesso em ${canal}`, ephemeral: true});
    })
    .catch(error => {
      console.error(error);
      interaction.reply(`Não foi possível enviar a mensagem em ${canal}.`);
    })
        
    }
    }}
