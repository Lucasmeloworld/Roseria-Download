const dc = require('discord.js')

module.exports = {
    name: "help",
    description: '[Informações] Veja informações sobre mim.',

    run: async (client, interaction) => {


        const botcor = interaction.guild.members.cache.get(client.user.id)
        const up = Math.floor(client.uptime / 60000) % 60;

        const b1 = new dc.ButtonBuilder()
        .setLabel(`Invite`)
        .setEmoji('✉')
        .setStyle(5)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=1070783913292726306&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpedubsQJk5&response_type=code&scope=bot%20applications.commands%20messages.read`)
        
        const b2 = new dc.ButtonBuilder()
        .setLabel(`Suporte`)
        .setEmoji('💻')
        .setStyle(5)
        .setURL(`https://discord.gg/gJ4BYhTPBN`)
        

        
       
        const botbutton = new dc.ActionRowBuilder().addComponents(b1,b2)

        const botembed = new dc.EmbedBuilder()
            .setTitle(client.user.username)
            .setDescription(`*Veja as minhas informações abaixo!*`)
            .setColor('fff4a2')
            .addFields(
                {name: `Criada Por`, value: `Lucasmeloworld`, inline: true},
                {name: `Nome:`, value: `**${client.user.username}**`, inline: true},
                
                {name: `Coloque "/" e veja os meus comandos SLASH!`, value: `Meus comandos estão em slash(/)`, inline: false},
                


                )
             .setThumbnail(client.user.displayAvatarURL())
            
             interaction.reply({ embeds: [botembed], components: [botbutton], content: `${interaction.user}`})
             .catch(error => {
                console.error(error);
                interaction.reply(`Não foi possível executar o commando.`);
              });
            
             




    }
}