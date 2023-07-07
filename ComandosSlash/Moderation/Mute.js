const Discord = require('discord.js');
const { neutronMassDependencies } = require('mathjs');

module.exports = {

    name: "timeout", 
    description: "Castigue um membro por um tempo.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        
        {
            name: "user",
            description: "Selecione um usuario a ser mutado.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "tempo",
            description: "Selecione um tempo de duração.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices:[
                {
                    name:"remover-timeout",
                    value:"0"
                },
                {
                    name:"1 minuto",
                    value:"60000"
                },
                {
                    name:"5 minutos",
                    value:"300000"
                },
                {
                    name:"15 minutos",
                    value:"900000"
                },
                {
                    name:"30 minutos",
                    value:"1800000"
                },
                {
                    name:"1 hora",
                    value:"3600000"
                },
                {
                    name:"5 horas",
                    value:"18000000"
                },
                {
                    name:"10 horas",
                    value:"36000000"
                },
                {
                    name:"1 dia",
                    value:"86400000"
                },
                {
                    name:"2 dias",
                    value:"172800000"
                },
                {
                    name:"3 dias",
                    value:"259200000"
                },
                {
                    name:"4 dias",
                    value:"345600000"
                },
                {
                    name:"5 dias",
                    value:"432000000"
                },
                {
                    name:"6 dias",
                    value:"518400000"
                },
                {
                    name:"1 semana",
                    value:"604800000"
                },
                {
                    name:"2 semanas",
                    value:"1209600000"
                },
                {
                    name:"3 semanas",
                    value:"1814400000"
                },
                {
                    name:"1 mês",
                    value:"2629800000"
                },
                {
                    name:"2 mêses",
                    value:"5259600000"
                },
                {
                    name:"3 mêses",
                    value:"7889400000"
                },
                {
                    name:"4 mêses",
                    value:"10519200000 "
                },
                {
                    name:"5 mêses",
                    value:"13149000000"
                }
                
            ]
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
        let tempo = interaction.options.getString("tempo");
        let usuario = interaction.options.getUser("user");
        let motivo = interaction.options.getString("motivo")
        if (!motivo) motivo = "Não definido.";

        let emb = new Discord.EmbedBuilder()
        .setTitle("Usuario mutado com sucesso.")
        .setDescription(`${usuario} foi mutado por ${interaction.user}.\nTempo restante: <t:${tempo}:R>.`)
        .setColor('Green')

        user.timeout(tempo)({ reason: [motivo] }).then( () => {
            interaction.reply({ embeds: [emb] })
        }).catch(e => {
            interaction.reply("Não foi possivel mutar o usuario!")
        })

    }
} 
}
