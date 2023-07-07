const Discord = require('discord.js')

module.exports = {

    name: "escolher", 
    description: "[Outros] Me peça para escolhe algo.", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        
        {
            name: "item1",
            description: "Coloque algo para eu esolher como: sorvete",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },

        {
            name: "item2",
            description: "Coloque algo para eu esolher como: sorvete",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        
        
let item1 = interaction.options.getString("item1")
let item2 = interaction.options.getString("item2")

        var escolha = [
           item1,
           item2,
    
          ]
          var random1 = escolha[Math.floor(Math.random() * escolha.length)];

    interaction.reply({content:`eu escolho... **"${random1}"**!`});

    }
} 