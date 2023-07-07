const Discord = require('discord.js')

module.exports = {
    name: "emoji-info",
    description: 'Veja informações do emoji.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "emoji",
            description: "[Informações] Selecione o emoji",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        let emoji = interaction.options.getString('emoji');

        const emojiMatch = emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/);
        if (!emojiMatch) {
            return interaction.reply('O emoji informado é inválido!');
        }

        const isAnimated = Boolean(emojiMatch[1]);
        const emojiName = emojiMatch[2];
        const emojiId = emojiMatch[3];


        let embed = new Discord.EmbedBuilder()
            .setTitle('Informações do emoji! ')
            .setDescription(`Emoji: ${emoji}`)
            .setColor('fff4a2')
            .setThumbnail(`https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? 'gif' : 'png'}`)
            .addFields(
                { name: 'Nome', value: emojiName, inline: true },
                { name: 'ID', value: emojiId, inline: true },
                { name: 'Link', value: `https://cdn.discordapp.com/emojis/${emojiId}.${isAnimated ? 'gif' : 'png'}` },
                { name: 'PNG ou GIF', value: `${isAnimated ? 'gif' : 'png'}` },
                {name:`Menção`, value:`\`<${isAnimated ? 'a' : ''}:${emojiName}:${emojiId}>\``}
            );
        interaction.reply({ embeds: [embed] })
        .catch(error => {
            console.error(error);
            interaction.reply(`Não foi possível enviar a mensagem em ${canal}.`);
          });

    }
    
}
