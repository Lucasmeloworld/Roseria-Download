const Discord = require('discord.js');
const { intersect, randomInt } = require('mathjs');
const stringSimilarity = require('string-similarity')

module.exports = {

    name: "perguntar",
    description: "[Diversão] Me pergunte algo", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        
        {
            name: "texto",
            description: "A sua pergunta",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction) => {

      

  
      let texto = interaction.options.getString('texto')
      //resposta para outras perguntas
      var Resposta1 = [        
            'Não siga o seu coração desta vez', 
            'Não é isso que você está pensando',        
            'Minha resposta é não',   
            'Talvez não',        
            'Não sei',        
            'Nunca!',        
            'Só sei que moro lá em Paris',        
            'Vai cutucar outro',        
            'Não quero ferir seus sentimentos, pergunte outra coisa',        
            'Vai embora',        
            'Suspeito',             
            'Apenas siga o seu coração',        
            'é isso que você está pensando',        
            'Minha resposta é sim',        
            'Talvez sim',        
            'Sim',        
            'Concerteza',
            'não sei a resposta para isso, talvez a FGL saiba.🤔',
            'Não posso te responder isso 😔',
            'Meu processador não consegue computar isso 🤡',
            'EI! Pergunte outras coisa!'
            ];
            var random1 = Resposta1[Math.floor(Math.random() * Resposta1.length)];

      interaction.reply('✨ | pensando na resposta...').then(()=>{
        setTimeout(()=> interaction.editReply(random1), 2000)
      })
    
      }

    }