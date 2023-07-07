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

// COMANDO DE INVENTÁRIO
module.exports = {
    name: "inventario",
    description: "Mostra os itens comprados pelo usuário",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Selecione alguém para ver o inventario.",
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        }
    ],

    run: async (client, interaction) => {
        const optionUser = interaction.options.getUser('user');
        const userId = optionUser ? optionUser.id : interaction.user.id;

        // Obter as compras e as insígnias do usuário no banco de dados
        const compras = obterCompras(userId);
        const insignias = obterInsignias(userId);

        // Formatar a lista de compras
        const listaCompras = compras.map((compra) => `- ${compra}`).join("\n");

        // Formatar a lista de insígnias
        const listaInsignias = insignias.map((insignia) => `- ${insignia}`).join(", ");

        // Enviar a resposta ao usuário
        const embed = new Discord.EmbedBuilder()
            .setTitle(`Inventário de ${optionUser ? optionUser.username : interaction.user.username}`)
            .setDescription("💎 | Itens obtidos:\n" + (listaCompras || "❌ | Nenhum item comprado.") + "\n\n" +
                "💠 | Insígnias obtidas:\n" + (listaInsignias || "❌ | Nenhuma insígnia obtida."))
            .setColor('Yellow');

        interaction.reply({ embeds: [embed] });
    },
};
