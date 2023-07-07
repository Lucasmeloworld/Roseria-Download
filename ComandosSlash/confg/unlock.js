const Discord = require("discord.js")

module.exports = {

    name: "unlock",
    description: "[Adiministração] destrancar chat",
    type: Discord.ApplicationCommandType.ChatInput,

run: async(client, interaction) => {

        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            interaction.reply({ content: `Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`, ephemeral: true})
        } else {

            let embed = new Discord.EmbedBuilder()
                .setTitle("✅ | Canal Desbloqueado!")
                .setColor('Random')
                .setDescription(`Canal desbloqueado por: ${interaction.user} `)

            interaction.reply({ embeds: [embed] }).then(msg => {
            interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(o => {
                    console.log(o)
                    interaction.reply({ content: `❌ | Ops, algo deu errado ao tentar destrancar este chat.`})
                })
            })
    
                }
            }        
    }