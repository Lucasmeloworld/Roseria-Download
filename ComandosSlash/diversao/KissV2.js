const Discord = require('discord.js')

module.exports = {

    name: "kiss", 
    description: "[Diversão] Dê um beijo em alguêm!", 
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        
        {
            name: "user",
            description: "Selecione o usuario",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],


    run: async (client, interaction) => {

        
        let user = interaction.options.getUser("user")
        
        var Gifs1 = [
            
                'https://imgur.com/II1bakc.gif',
                'https://imgur.com/MzAjNdv.gif',
                'https://imgur.com/eKcWCgS.gif',
                'https://imgur.com/3aX4Qq2.gif',
                'https://imgur.com/uobBW9K.gif',
                'https://imgur.com/3jzT5g6.gif',
                'https://imgur.com/VrETTlv.gif',
                'https://imgur.com/FozOXkB.gif',
                'https://imgur.com/7GhTplD.gif',
                'https://imgur.com/B6UKulT.gif'
            ];

          
          var random1 = Gifs1[Math.floor(Math.random() * Gifs1.length)];

          let embed2= new Discord.EmbedBuilder()   
          .setTitle('❌ Você não pode se beijar!')
          .setColor('Red')
  
  
          if (user.id === interaction.user.id) {
              interaction.reply({ embeds:[embed2] });
              return;
          }

          let embed3= new Discord.EmbedBuilder()
          .setTitle(`Eu não gosto de beijos! `)   
          .setDescription(`** ${client.user} recusou o beijo de ${interaction.user}!**`)
          .setColor('Red')
          .setImage('https://media.tenor.com/ZUyLW5r6hjEAAAAM/anime-no.gif')
          
          if (user.id === client.user.id) {
            interaction.reply({ embeds:[embed3] });
            return;
        }
          


        let embed= new Discord.EmbedBuilder()   
        .setDescription(`** ${interaction.user} beijou ${user}!**`)
        .setColor('Yellow')
        .setImage(random1)

        interaction.reply({ embeds: [embed]});


    }}
