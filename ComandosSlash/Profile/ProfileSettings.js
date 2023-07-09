const Discord = require('discord.js');
const Database = require('better-sqlite3');

// Abrir conexão com o banco de dados
const db = new Database('database.db');

// Criar tabela para armazenar saldos dos usuários, se ainda não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        balance INTEGER DEFAULT 0
    );
`);

// Criar tabela para armazenar as compras dos usuários, se ainda não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS compras (
        user_id TEXT,
        item_name TEXT
    );
`);

// Criar tabela para armazenar as insígnias dos usuários, se ainda não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS insignias (
        user_id TEXT,
        insignia_name TEXT
    );
`);

// Criar tabela para armazenar os dados de personalização do perfil
db.exec(`
    CREATE TABLE IF NOT EXISTS perfil_personalizado (
        user_id TEXT PRIMARY KEY,
        about_me TEXT,
        emoji TEXT,
        embed_color TEXT,
        small_image TEXT,
        big_image TEXT
    );
`);

// Função para obter as compras do usuário no banco de dados
function obterCompras(userId) {
    const query = db.prepare('SELECT item_name FROM compras WHERE user_id = ?');
    const results = query.all(userId);
    return results ? results.map((row) => row.item_name) : [];
}

// Função para obter as insígnias do usuário no banco de dados
function obterInsignias(userId) {
    const query = db.prepare('SELECT insignia_name FROM insignias WHERE user_id = ?');
    const results = query.all(userId);
    return results ? results.map((row) => row.insignia_name) : [];
}

// Função para atualizar o saldo, compras e insígnias do usuário no banco de dados
function atualizarCompra(usuarioId, item) {
    const atualizarSaldo = db.prepare('UPDATE users SET balance = balance - ? WHERE user_id = ?');
    const inserirCompra = db.prepare('INSERT INTO compras (user_id, item_name) VALUES (?, ?)');
    const inserirInsignia = db.prepare('INSERT INTO insignias (user_id, insignia_name) VALUES (?, ?)');

    // Atualizar o saldo do usuário
    atualizarSaldo.run(item.price, usuarioId);

    // Inserir a compra do usuário no registro de compras
    inserirCompra.run(usuarioId, item.name);

    // Verificar se o item é o "Presente Misterioso"
    if (item.name === "Presente Misterioso") {
        // Inserir a insígnia de primeira compra para o usuário
        inserirInsignia.run(usuarioId, "Insignia de Primeira Compra");
    }
}

// Função para salvar os dados de personalização do perfil
function salvarDadosPerfil(usuarioId, aboutMe, emoji, embedColor, smallImage, bigImage) {
    const inserirDados = db.prepare(`
        INSERT INTO perfil_personalizado (user_id, about_me, emoji, embed_color, small_image, big_image)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT (user_id)
        DO UPDATE SET about_me = excluded.about_me,
                      emoji = excluded.emoji,
                      embed_color = excluded.embed_color,
                      small_image = excluded.small_image,
                      big_image = excluded.big_image
    `);

    inserirDados.run(usuarioId, aboutMe, emoji, embedColor, smallImage, bigImage);
}

module.exports = {
    name: "personalizar-perfil",
    description: "[Perfil] Modifique seu perfil Roseria.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "about-me",
            description: "Escreva o seu sobre mim.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "emoji",
            description: "Emoji de decoração. Requer item de personalização!",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "embed-color",
            description: "Cor para o embed. Requer item de personalização!",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: '🟨 | Amarelo',
                    value: 'Yellow'
                },
                {
                    name: '🟦 | Azul',
                    value: 'Blue'
                },
                {
                    name: '🟧 | Laranja',
                    value: 'Orange'
                },
                {
                    name: '🟪 | Roxo',
                    value: 'Purple'
                },
                {
                    name: '🟩 | Verde',
                    value: 'Green'
                },
                {
                    name: '🟥 | Vermelho',
                    value: 'Red'
                },
            ]
        },
        {
            name: "small-image",
            description: "Coloque um link de imagem. Requer item de personalização.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "big-image",
            description: "Coloque um link de imagem. Requer item de personalização.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        interaction.reply(`📁 | Procurando o perfil...`).then(()=>{
            setTimeout(()=>{
        
        const userId = interaction.user.id;
        const aboutMe = interaction.options.getString("about-me");
        const emoji = interaction.options.getString("emoji");
        const embedColor = interaction.options.getString("embed-color");
        const smallImage = interaction.options.getString("small-image");
        const bigImage = interaction.options.getString("big-image");

        // Verificar se o usuário possui o item "💠 | Emoji decorativo「Perfil」"
        const temEmojiDecorativo = obterCompras(userId).includes("💠 | Emojis decorativos「Perfil」");
        if (!temEmojiDecorativo && emoji) {
            interaction.editReply("Você precisa comprar o item \"💠 | Emojis decorativos「Perfil」\" antes de poder utilizá-lo.");
            return;
        }

        // Verificar se o usuário possui o item "🎀 | Fita colorida「Perfil」"
        const temFitaColorida = obterCompras(userId).includes("🎀 | Fita colorida「Perfil」");
        if (!temFitaColorida && embedColor) {
            interaction.editReply("Você precisa comprar o item \"🎀 | Fita colorida「Perfil」\" antes de poder utilizá-lo.");
            return;
        }

        // Verificar se o usuário possui o item "📌 | Foto pequena「Perfil」"
        const temFotoPequena = obterCompras(userId).includes("📌 | Foto pequena「Perfil」");
        if (!temFotoPequena && smallImage) {
            interaction.editReply("Você precisa comprar o item \"📌 | Foto pequena「Perfil」\" antes de poder utilizá-lo.");
            return;
        }

        // Verificar se o usuário possui o item "📌 | Foto grande「Perfil」"
        const temFotoGrande = obterCompras(userId).includes("📌 | Foto grande「Perfil」");
        if (!temFotoGrande && bigImage) {
            interaction.editReply("Você precisa comprar o item \"📌 | Foto grande「Perfil」\" antes de poder utilizá-lo.");
            return;
        }

        // Salvar os dados de personalização do perfil
        salvarDadosPerfil(userId, aboutMe, emoji, embedColor, smallImage, bigImage);

        interaction.editReply("Seu perfil foi personalizado com sucesso!")}, 3500)
    })
    }
}
