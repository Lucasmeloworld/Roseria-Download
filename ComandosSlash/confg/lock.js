const Discord = require("discord.js")

module.exports = {

    name: "lock",
    description: "[Adiministração] trancar chat",
    type: Discord.ApplicationCommandType.ChatInput,

run: async(client, interaction) => {

        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            interaction.reply({ content: `Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`,  ephemeral: true})
        } else {

            let embed = new Discord.EmbedBuilder()
                .setTitle("Canal Tracado🔒")
                .setColor('Random')
                .setDescription(`Este chat foi trancado com sucesso por: ${interaction.user} `)

            interaction.reply({ embeds: [embed] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    interaction.reply({ content: `❌ Ops, algo deu errado ao tentar destrancar este chat.`})

                    
                })
            })
    
                }
            }        
    }
