const Discord = require('discord.js')

module.exports = {

    name: "hug", 
    description: "[Diversão] Abrace um usuario!", 
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
            
           'https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif',
           'https://media.tenor.com/HYkaTQBybO4AAAAC/hug-anime.gif',
           'https://media.tenor.com/gyiM68xD1MQAAAAC/anime-cute.gif',
           'https://media.tenor.com/G_IvONY8EFgAAAAC/aharen-san-anime-hug.gif',
           'https://media.tenor.com/Maq1tnCFd2UAAAAC/hug-anime.gif',
           'https://media.tenor.com/xIuXbMtA38sAAAAd/toilet-bound-hanakokun.gif',
           'https://media.tenor.com/5UwhB5xQSTEAAAAC/anime-hug.gif',
           'https://media.tenor.com/-0nQoPY5sZ0AAAAC/anime-hug-hug.gif',
           'https://media.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif',
           'https://media.tenor.com/AO-1yttBeH8AAAAC/anime-hug.gif',
           'https://media.tenor.com/B3R3eEskky8AAAAC/anime-hug.gif',
          ]
          var random1 = Gifs1[Math.floor(Math.random() * Gifs1.length)];
          
         
          
        let embed2= new Discord.EmbedBuilder()   
        .setTitle('**Você não pode se abraçar, mas eu posso**!')
        .setDescription(`Lembre-se, um abaraço pode ser o melhor presente a alguém!`)
        .setColor('Yellow')
        .setImage(random1)
        
        let embed3= new Discord.EmbedBuilder()   
        .setTitle('Obrigada pelo abraço! ❤')
        .setDescription(`** ${interaction.user} abraçou  ${user} .`)
        .setColor('Yellow')
        .setImage(random1)

        if (user.id === interaction.user.id) {
            interaction.reply({ embeds:[embed2] });
            return;
        }

        if (user.id === client.user.id){
            interaction.reply
        }

        let embed= new Discord.EmbedBuilder()   
        .setDescription(`** ${interaction.user} abraçou  ${user} .**`)
        .setColor('Yellow')
        .setImage(random1)

        interaction.reply({ embeds: [embed]});


    }}
