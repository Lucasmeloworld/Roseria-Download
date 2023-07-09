const Discord = require('discord.js')

module.exports = {

    name: "dado-6-lados", 
    description: "[Diversão] Lançe um dado de 6 lados e teste sua sorte!", 
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async (client, interaction) => {


            var Dado = [
              'O número sorteado foi. . . 1!',
              'O número sorteado foi. . . 2!',
              'O número sorteado foi. . . 3!',
              'O número sorteado foi. . . 4!',
              'O número sorteado foi. . . 5!',
              'O número sorteado foi. . . 6!',

      
            ]
            var random1 = Dado[Math.floor(Math.random() * Dado.length)];


            let embed= new Discord.EmbedBuilder()   
            .setTitle(random1)
            .setColor('Blue')
            .setImage("https://media.tenor.com/CuHx_i0bNfUAAAAC/yelan-genshin-genshin-impact.gif")

            interaction.reply("🎲 | Girando o Dado...").then(()=>{
              setTimeout(()=> interaction.editReply(`🎲 | ${random1}`) , 2000)
            })

    
    

    }
} 