const client = require("../../index");

client.on("ready", () =>{
  
  console.log(`✨ Dispoível. Logada em ${client.user.tag}`)

})
const Discord = require("discord.js");


client.on("ready", () =>{

//let Canal = client.channels.cache.get('Seu_Canal')



let status = new Discord.EmbedBuilder()   
        .setTitle('Status atual')
        .setColor('Yellow')
        .setThumbnail(client.user.displayAvatarURL())
        .setImage('https://media.discordapp.net/attachments/1102216114005614612/1109443739132371004/Roseria_Bannner.png')
        .addFields(

                {
                name: `🔍Status:`,
                value: `<:correct:1081600996167393310> | Online!`,
                inline: false
            },
          
          {
            name: "📚 | Versão:",
            value: "`8.0.1 - Atualizada`",
            inline: false
        },

        
        {
          name: `📜 | Script Version`,
          value: `\`Discord.js, Version ${Discord.version}\``,
          inline: false
      },
      
      {
        name: `🍀 | Criador`,
       value: '<@949257362294833162>',
       inline: false
 
       }

        )

          //Canal.send({ embeds: [status] })
          //Remova "//" caso queira que envie uma mensagem em um canal especifico ao ligar.
})


