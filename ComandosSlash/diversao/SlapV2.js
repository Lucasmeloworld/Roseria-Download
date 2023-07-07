const Discord = require('discord.js')

module.exports = {

    name: "bofetada-slap", 
    description: "[Diversão] Dê um tapa em alguêm!", 
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
            
           'https://media.tenor.com/yJmrNruFNtEAAAAC/slap.gif',
           'https://media.tenor.com/Ws6Dm1ZW_vMAAAAC/girl-slap.gif',
           'https://media.tenor.com/zXqvIewp3ToAAAAC/asobi-asobase.gif',
           'https://media.tenor.com/oYsWol5_exYAAAAC/slap.gif',
           'https://media.tenor.com/iDdGxlZZfGoAAAAC/powerful-head-slap.gif',
           'https://media.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif',
           'https://media.tenor.com/5eI0koENMAAAAAAM/anime-hit.gif',
           'https://media.tenor.com/E3OW-MYYum0AAAAC/no-angry.gif',
           'https://media.tenor.com/k93SF04dIhQAAAAM/slap.gif',
           'https://media.tenor.com/RbSS2HM-97oAAAAM/slap.gif',
           'https://media.tenor.com/0ipmLVckzKwAAAAM/slap.gif',
           'https://media.tenor.com/klNTzZNDmEgAAAAC/slap-hit.gif',
           'https://media.tenor.com/IROtP5rDhRsAAAAd/venti-venti-slap.gif',
           'https://media.tenor.com/HTHoXnBc400AAAAM/in-your-face-slap.gif',


        

          ]
          var random1 = Gifs1[Math.floor(Math.random() * Gifs1.length)];

          let embed2= new Discord.EmbedBuilder()   
          .setTitle('❌ Você não pode se dar um tapa!')
          .setColor('Red')
  
  
          if (user.id === interaction.user.id) {
              interaction.reply({ embeds:[embed2] });
              return;
          }

          let embed3= new Discord.EmbedBuilder()
          .setTitle(`😡 Como ousa me bater! Aqui vai uma pequena lição! `)   
          .setDescription(`** ${client.user} revidou o tapa de ${interaction.user}!**`)
          .setColor('Yellow')
          .setImage('https://media.tenor.com/wG4PifSEqigAAAAd/kafka-kafka-slay.gif')
          
          if (user.id === client.user.id) {
            interaction.reply({ embeds:[embed3] });
            return;
        }
          


        let embed= new Discord.EmbedBuilder()   
        .setDescription(`** ${interaction.user} deu um tapão em ${user}!**`)
        .setColor('Yellow')
        .setImage(random1)

        interaction.reply({ embeds: [embed]});


    }}
