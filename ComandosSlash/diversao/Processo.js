const Discord = require('discord.js')
const { random } = require('mathjs')

module.exports = {

    name: "processo", 
    description: "[Diversão] Processe alguém com base da sua imaginação.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        
        {
            name: "user",
            description: "Selecione o usuario.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },

        {
            name: "valor",
            description: "Selecione um valor.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices:[
                {
                    name: "1 centavo",
                    value: "0,01 R$",
                },
                {
                    name: "1 Real",
                    value: "1 R$",
                },
                {
                    name: "10 Reais",
                    value: "10 R$",
                },
                {
                    name: "100 Reais",
                    value: "100 R$",
                },
                {
                    name: "1.000 Reais",
                    value: "1.000 R$",
                },
                {
                    name: "10.000 Reais",
                    value: "10.000 R$",
                },
                {
                    name: "100.000 Reais",
                    value: "100.000 R$",
                }, 
                {
                    name: "1.000.000 Reais",
                    value: "1.000.000 R$",
                },
                {
                    name: "10.000.000 Reais",
                    value: "10.000.000 R$",
                },
                {
                    name: "100.000.000 Reais",
                    value: "100.000.000 R$",
                },
                {
                    name: "1.000.000.000 Reais",
                    value: "1.000.000.000 R$",
                },
            ]
        },

        {
            name: "motivo",
            description: "Escreva o motivo de seu processo, como: Me jogou um bolo na cara!",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }

    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser("user")
        let money = interaction.options.getString("valor")
        let motivo = interaction.options.getString("motivo")

        let userP = new Discord.EmbedBuilder()
        .setTitle("❌ | Você não pode se-processar! A não ser que você viva em outro mundo...")
        .setColor('Red')

        let roseP = new Discord.EmbedBuilder()
        .setTitle("❌ | Eu não fiz nada de errado então não serei processada! 😎")
        .setColor('ff46c0')
        
        if (user.id === interaction.user.id) {
            interaction.reply({embeds:[userP]});
            return;
        }
        if(user.id === client.user.id){
            interaction.reply({emdeds:[roseP]});
            return;
        }

        let embed = new Discord.EmbedBuilder()
        .setTitle('Roseria processos')
        .setDescription(` ${interaction.user} processou ${user} em **${money}**!`)
        .setColor('Red')
        .setFooter({text:`Isto é apenas um roleplay, é um processo falso!`, iconURL: client.user.avatrURL})
        .addFields(

            {
                name: `Veja o motivo abaixo:`,
               value: motivo,
               inline: false
         
               }
        )

        
        
    interaction.reply({embeds: [embed]});

    }
} 