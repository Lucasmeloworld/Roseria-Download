const Discord = require('discord.js');
const Database = require('better-sqlite3');

// Abrir conexão com o banco de dados
const db = new Database('database.db');

// Função para obter os dados de personalização do perfil do usuário no banco de dados
function obterDadosPerfil(userId) {
    const query = db.prepare('SELECT * FROM perfil_personalizado WHERE user_id = ?');
    const result = query.get(userId);
    return result ? result : null;
}

// Função para criar um perfil personalizado para o usuário
function criarPerfil(userId) {
    const inserirPerfil = db.prepare('INSERT INTO perfil_personalizado (user_id) VALUES (?)');
    inserirPerfil.run(userId);
}

module.exports = {
    name: "perfil",
    description: "[Perfil] Visualize o perfil de um usuário.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            description: "Usuário do qual deseja visualizar o perfil. Deixe em branco para visualizar seu próprio perfil.",
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        interaction.reply(`📁 | Procurando Perfil...`).then(()=>{
            setTimeout(()=>{
        const targetUser = interaction.options.getUser("usuário") || interaction.user;
        const targetUserId = targetUser.id;

        // Verificar se o usuário possui um perfil personalizado
        let dadosPerfil = obterDadosPerfil(targetUserId);

        // Se o usuário não tiver um perfil, criar um para ele
        if (!dadosPerfil) {
            criarPerfil(targetUserId);
            dadosPerfil = obterDadosPerfil(targetUserId);
        }

        // Verificar se o "sobre mim" está vazio e exibir uma mensagem padrão
        let aboutMe = dadosPerfil.about_me ? dadosPerfil.about_me : "Oi! Este é meu perfil! A Roseria é uma ótima amiga! Dica: Troque seu sobre mim com `/personalizar-perfil`.";

        // Construir a mensagem do perfil
        const embed = new Discord.EmbedBuilder()
        .setTitle(`Perfil de ${targetUser.tag}`)
        .setDescription(`${dadosPerfil.emoji || "<:Roseria:1091503334457872464>"}\n**Insignías - ${dadosPerfil.insignias || ""}**\n\n${aboutMe}`)
        .setImage(dadosPerfil.big_image || "https://cdn.discordapp.com/attachments/1078310342641328199/1123377794324373504/image.png")
        .setThumbnail(dadosPerfil.small_image || targetUser.displayAvatarURL())
        .setColor(dadosPerfil.embed_color || 'ffffff');

        interaction.editReply({ embeds: [embed], content: '' }).catch(error => {
            console.error(error);
            interaction.editReply(`❌ | Me desculpe, não consegui visualizar seu perfil...`);
          });
}, 3500)
    })
    }
}
