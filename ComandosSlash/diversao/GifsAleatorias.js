const Discord = require('discord.js')

module.exports = {

    name: "gif", 
    description: "[Diversão] Enviarei uma gif aleatoria.", 
    type: Discord.ApplicationCommandType.ChatInput,
   
    run: async (client, interaction) => {

      

      var Resposta1 = [
        'https://media.tenor.com/fB1wgZa_9KgAAAAd/yumiki-meme-waifucubbie.gif',
        'https://media.tenor.com/3yuTJ7S5yeQAAAAC/my-honest-reaction-my-honest-reaction-meme.gif',
        'https://media.tenor.com/4osTi3Avj8wAAAAM/dance-happy.gif',
        'https://media.tenor.com/wMDO2ceyGOYAAAAM/dog-sad.gif',
        'https://media.tenor.com/ulpGRE3WiPkAAAAM/yogscast-lydia.gif',
        'https://media.tenor.com/RPXO08OJgpMAAAAM/kermit-spinning.gif',
        'https://media.tenor.com/-giFRRhKFqcAAAAC/xqc-spin.gif',
        'https://media.tenor.com/GhP7j59Z-ogAAAAd/xqc-sad.gif',
        'https://media.tenor.com/9ACYzmxxFh8AAAAd/tulla-luana.gif',
        'https://media.tenor.com/Pz84UdRVxcwAAAAd/kaiaghost-tulla.gif',
        'https://media.tenor.com/hKwxhM5u3AcAAAAC/run-panic.gif',
        'https://media.tenor.com/NQfq1liFH-8AAAAd/byuntear-sad.gif',
        'https://media.tenor.com/Hipi6wGslLkAAAAC/out-disappear.gif',
        'https://media.tenor.com/3NYh0Xao50MAAAAC/lol-windy-day.gif',
        'https://media.tenor.com/ei8s117ZieIAAAAC/ugh-rolling-eyes.gif',
        'https://media.tenor.com/SYhGEPcGbkkAAAAM/pain-painful.gif',
        'https://media.tenor.com/9xx5jJaHPpIAAAAM/fat-guy.gif',
        'https://media.tenor.com/Lg21skpXtU4AAAAC/cat-meme.gif',
        'https://media.tenor.com/7tI8tUr8130AAAAM/dramatic-chipmunk.gif',
        'https://media.tenor.com/a_r4GmijSuMAAAAC/angry-little-girl-annoyed.gif',
        'https://media.tenor.com/eaAbCBZy0PoAAAAS/reverse-nozumi.gif',
        'https://media.tenor.com/RauDLOkEmaIAAAAC/polar-vortex.gif',
        'https://media.tenor.com/wn2_Qq6flogAAAAC/magical-magic.gif',
        'https://media.tenor.com/XMRnHdhvVvcAAAAC/cry-about-it-cry.gif',
        'https://media.tenor.com/D43c0qwX_TEAAAAC/sick-thats.gif',
        'https://media.tenor.com/UIrQocNe4xYAAAAC/no-no-no-way.gif',
        'https://media.tenor.com/FXqwSp6r08UAAAAS/snow-day.gif',
        'https://media.tenor.com/tvg6rUHgKAoAAAAC/kermit-say-what.gif',
        'https://media.tenor.com/apxQpu70-i4AAAAd/funny-animals-dog.gif',
        'https://media.tenor.com/MhEq68akfqEAAAAd/crying-it-is.gif',
        'https://media.tenor.com/cP9C-PnPrS4AAAAC/kermit-anxiety.gif',
        'https://media.tenor.com/LtKt8LC0luwAAAAC/kermit-kermit-meme.gif',
        'https://media.tenor.com/Q7jwPfHly_gAAAAC/kermit.gif'
      ]
     
      var random1 = Resposta1[Math.floor(Math.random() * Resposta1.length)];

      let embed= new Discord.EmbedBuilder()   
      .setTitle("Gif aleatoria!")
      .setImage(random1)
  
      interaction.reply({ embeds: [embed] })
     
    }
}
