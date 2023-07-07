const Discord = require('discord.js');
const { neutronMassDependencies } = require('mathjs');

module.exports = {

    name: "remover-timeout", 
    description: "remova o mute de um membro.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        
        {
            name: "user",
            description: "Selecione um usuario a ser mutado.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "motivo",
            description:"Defina um motivo para a punição.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.TimeoutMembers)) {
            interaction.reply(`Você não possui permissão para utilizar este comando.`);
        } else {
        
        let usuario = interaction.options.getUser("user");
        let motivo = interaction.options.getString("motivo")
        if (!motivo) motivo = "Não definido.";

        let emb = new Discord.EmbedBuilder()
        .setTitle("Usuario desmutado com sucesso.")
        .setColor('Green')

        user.timeout(0)({ reason: [motivo] }).then( () => {
            interaction.reply({ embeds: [emb] })
        }).catch(e => {
            interaction.reply("Não foi possivel desmutar o usuario!")
        })

    }
} 
}
