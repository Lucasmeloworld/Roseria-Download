const Discord = require('discord.js')

module.exports = {

    name: "faustao", 
    description: "[Diversão] O Faustão vai dizer algo!", 
    type: Discord.ApplicationCommandType.ChatInput,
   
    run: async (client, interaction) => {
      var Resposta1 = [
        'Ô loco, bixo!',
        'Brincadeira! Esta fera aí, meu!',
        'É brincadeira, bicho',
        'E agora, mais do que nunca.',
        'E vem aí, logo depois dos reclames do plin plin.',
        'Ô loco, meu.',
        'Ta pegando fogo bixo!',
        'Se vira nos 30.',
        'Olha o que essa anta fez.',
        'ERRRROU',
        'Abrindo o saco de risadas.'

      ]
      var random1 = Resposta1[Math.floor(Math.random() * Resposta1.length)];

      
  
      interaction.reply({ content: random1 })
     
    }

}