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

// Função para obter o saldo da carteira do usuário no banco de dados
function obterSaldo(userId) {
    const query = db.prepare('SELECT balance FROM users WHERE user_id = ?');
    const result = query.get(userId);
    return result ? result.balance : 0;
}

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
    const inserirCompra = db.prepare('INSERT OR IGNORE INTO compras (user_id, item_name) VALUES (?, ?)');
    const inserirInsignia = db.prepare('INSERT OR IGNORE INTO insignias (user_id, insignia_name) VALUES (?, ?)');

    // Verificar se o usuário tem o item "🎁 | Presente Misterioso「limitado」"
    const compras = obterCompras(usuarioId);
    const presenteMisterioso = compras.includes('🎁 | Presente Misterioso「limitado」');

    // Atualizar o saldo do usuário
    atualizarSaldo.run(item.price, usuarioId);

    // Inserir a compra do usuário no registro de compras
    inserirCompra.run(usuarioId, item.name);

    // Verificar se o item comprado é o "🎁 | Presente Misterioso「limitado」"
    if (item.name === '🎁 | Presente Misterioso「limitado」' && !presenteMisterioso) {
        // Inserir a insígnia no usuário
        inserirInsignia.run(usuarioId, '<:Insignia_Roseria:1123396480418463826>');

        // Inserir os itens adicionais no usuário
        inserirCompra.run(usuarioId, '🎀 | Fita colorida「Perfil」');
        inserirCompra.run(usuarioId, '📌 | Foto grande「Perfil」');
    }
}


// Função para obter os itens disponíveis na loja
function obterItensDisponiveis() {
    return [
        { name: '🎁 | Presente Misterioso「limitado」', price: 500 },
        { name: '💼 | Maleta da sorte「Multiplicador」', price: 5000 },
        { name: '✨ | Estrelas do desejo「Multiplicador」', price: 6500 },
        { name: '💳 | Cartão EzBank Plus「Compras」', price: 2000 },
        { name: '💠 | Emojis decorativos「Perfil」', price: 500 },
        { name:'📌 | Foto grande「Perfil」', price: 700},
        { name:'📌 | Foto pequena「Perfil」', price: 400 },
        { name:'🎀 | Fita colorida「Perfil」', price: 650 },
    ];
}

// COMANDO DE COMPRA
module.exports = {
    name: "comprar",
    description: "[Economia] Compre um item da loja",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "item",
            description: "Nome do item a ser comprado",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: obterItensDisponiveis().map((item) => ({
                name: item.name,
                value: item.name,
            })),
        },
    ],
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const itemName = interaction.options.getString("item");

        // Verificar se o item existe
        const item = obterItensDisponiveis().find((item) => item.name === itemName);
        if (!item) {
            interaction.reply("Item inválido.");
            return;
        }

        // Verificar se o usuário tem saldo suficiente
        const saldo = obterSaldo(userId);
        if (saldo < item.price) {
            let embedInsufficientFunds = new Discord.EmbedBuilder()
                .setTitle("❌ | Saldo Insuficiente")
                .setDescription("⚠️ | Você não possui saldo suficiente para fazer essa compra.")
                .setColor('Red');
            interaction.reply({ embeds: [embedInsufficientFunds] });
            return;
        }

        // Verificar se o usuário já possui o item
        const compras = obterCompras(userId);
        if (compras.includes(itemName)) {
            let obtedItem = new Discord.EmbedBuilder()
                .setTitle(`🛒 | Você já possui o item!`)
                .setColor('Red');
            
            interaction.reply({ embeds: [obtedItem] });
            return;
        }

        // Atualizar a compra no banco de dados
        atualizarCompra(userId, item);

        // Enviar a resposta ao usuário
        const buyedItem = new Discord.EmbedBuilder()
            .setTitle(`🛒 | Compra concluída.`)
            .setDescription(`Você comprou o item "${itemName}" por \`${item.price.toLocaleString()} Coins\`.`)
            .setColor('Green')
        interaction.reply({ embeds: [buyedItem] });
    },
};
