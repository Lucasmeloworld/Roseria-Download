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
module.exports = db;
//SISTEMA DO DATABASE

//COMANDO DE CARTEIRA
module.exports = {
    name: "carteira",
    description: "Mostra o saldo da carteira",
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

        // Obter o saldo do usuário no banco de dados
        const balance = obterSaldo(userId);

        // Enviar a resposta ao usuário
        let wallet = new Discord.EmbedBuilder()
            .setTitle("💳 | Conta RoseBank de ")
            .setDescription(`Saldo de <@${userId}>.\n\`${(balance).toLocaleString()}\` RoseCoins.`)
            .setColor('Yellow')
            
        interaction.reply({ embeds: [wallet] });
    },
};

// Função para obter o saldo da carteira do usuário no banco de dados
function obterSaldo(userId) {
    const query = db.prepare('SELECT balance FROM users WHERE user_id = ?');
    const result = query.get(userId);
    return result ? result.balance : 0;
}
