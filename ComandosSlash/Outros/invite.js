const dc = require('discord.js')

module.exports = {
    name: "invite",
    description: '[Outros] Me convide para seu servidor.',

    run: async (client, interaction) => {


        const botcor = interaction.guild.members.cache.get(client.user.id)
        const up = Math.floor(client.uptime / 60000) % 60;

        const b1 = new dc.ButtonBuilder()
        .setLabel(`Invite`)
        .setEmoji('✉')
        .setStyle(5)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=1070783913292726306&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FpedubsQJk5&response_type=code&scope=bot%20applications.commands%20messages.read`)

        
        const botbutton = new dc.ActionRowBuilder().addComponents(b1)

        const botembed = new dc.EmbedBuilder()
            .setTitle(client.user.username)
            .setDescription(`*Me convide pelo botão abaixo!*`)
            .setColor('fff4a2')
            .setThumbnail(client.user.displayAvatarURL())
            

            interaction.reply({ embeds: [botembed], components: [botbutton], content: `${interaction.user}`})
            .catch(error => {
                console.error(error);
                interaction.reply(`Não foi possível enviar a mensagem em ${canal}.`);
              });
      
    }
}            
