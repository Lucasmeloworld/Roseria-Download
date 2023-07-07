const Discord = require("discord.js");

module.exports = {
    name: "ping-latencia",
    description: "[Informações] Veja minha latência atual",
    type: Discord.ApplicationCommandType.ChatInput,
  
     run: async(client, interaction) => {
  
  let gatewayPing = client.ws.ping;
  let apiPing = Date.now() - interaction.createdTimestamp;
  
  let embed = new Discord.EmbedBuilder()
        .setColor("fff4a2")
        .setTitle('🏓__Pong__!  Veja meu estado atual:')
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
          {
            name: `💻| Latencia atual:`,
            value: `\n🚪| Gateway ping:**\`${gatewayPing}ms\`** \n🤖| Api Ping: **\`${apiPing}ms\`**`,
            inline: false
        },
      )
       interaction.reply({embeds: [embed] })
       .catch(error => {
        console.error(error);
        interaction.reply(`Não foi possível executar o comando.`);
      });
       
        
       
     }
  }