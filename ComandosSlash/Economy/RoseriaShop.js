const Discord = require('discord.js');

module.exports = {
    name: "loja",
    description: "Veja a Loja atual da Roseria.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "categoria",
            description: "Selecione uma categoria de produtos.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Ofertas',
                    value: 'off-sale',
                },
                {
                    name: 'Perfil',
                    value: 'profile',
                },
                {
                    name: 'Benefícios',
                    value: 'beneficios',
                },
            ],
        },
    ],

    run: async (client, interaction) => {
        const choice = interaction.options.getString('categoria');

        const beneficios = new Discord.EmbedBuilder()
            .setTitle("🛍 | Loja da Roseria")
            .setDescription("🔹 | Benefícios\n🔸 | Veja os itens disponíveis:")
            .setColor('Yellow')
            .addFields(
                { name: '💼 | Maleta da sorte (Multiplicador)', value: 'Lhe dá 0.5x de RoseCredits ao trabalhar.\n`5.000 RoseCredits`', inline: false },
                { name: '✨ | Estrelas do desejo (Multiplicador)', value: 'Tem 5% de chance de dobrar o valor recebido no daily.\n`6.500 RoseCredits`', inline: false },
                { name: '💳 | Cartão mais vantajoso (Compras)', value: 'Obtém 10% de desconto ao comprar itens.\n`2.000 RoseCredits`', inline: false },
            );

        const profile = new Discord.EmbedBuilder()
            .setTitle('🛍 | Loja da Roseria')
            .setDescription("🔹 | Perfil\n🔸 | Veja os itens disponíveis:")
            .setColor('Yellow')
            .addFields(
                { name: '💠 | Emoji decorativo (Perfil)', value: 'Decoração para perfil\n`500 RoseCredits`', inline: false },
                { name: '🎀 | Fita colorida (Perfil)', value: 'Decoração para perfil\n`650 RoseCredits`', inline: false },
                { name: '📌 | Foto pequena (Perfil)', value: 'Decoração para perfil\n`400 RoseCredits`', inline: false },
                { name: '📌 | Foto grande (Perfil)', value: 'Decoração para perfil\n`700 RoseCredits`', inline: false },
            );

        const offSale = new Discord.EmbedBuilder()
            .setTitle('🛍 | Loja da Roseria')
            .setColor('Yellow')
            .setDescription("🔹 | Ofertas\n🔸 | Veja os itens disponíveis:")
            .addFields(
                { name: '🎁 | Caixa Misteriosa (limitado)', value: 'Um pacote misterioso que contém 3 itens limitados.\n`1.500 RoseCredits`' },
            );
            

        if (choice === 'profile') {
            interaction.reply({ embeds: [profile] });
        } else if (choice === 'beneficios') {
            interaction.reply({ embeds: [beneficios] });
        } else if (choice === 'off-sale') {
            interaction.reply({ embeds: [offSale] });
        }
    },
};
