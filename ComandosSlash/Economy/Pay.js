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

// COMANDO DE PAGAMENTO
module.exports = {
    name: "pagar",
    description: "[Economia] Pague outro usuário",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            description: "Selecione alguém para pagar.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "valor",
            description: "Digite o valor a ser pago.",
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const recipientId = interaction.options.getUser("usuario").id;
        const amount = interaction.options.getInteger("valor");

        // Verificar se o usuário já possui um registro no banco de dados
        const userRow = db.prepare("SELECT balance FROM users WHERE user_id = ?").get(userId);

        let balance = 0;

        if (userRow) {
            // O usuário já possui um registro, obter o saldo atual
            balance = userRow.balance;
        }

        // Verificar se o remetente possui saldo suficiente
        const senderBalance = getBalance(userId);


        if (amount > senderBalance) {
            let embedInsufficientFunds = new Discord.EmbedBuilder()
                .setTitle("❌ | Saldo Insuficiente")
                .setDescription("⚠️ | Você não possui saldo suficiente para fazer essa transação.")
                .setColor('Red');

            return interaction.reply({ embeds: [embedInsufficientFunds] });
        }

        // Atualizar saldos do remetente e destinatário
        atualizarSaldo(userId, -amount);
        atualizarSaldo(recipientId, amount);

        let embedPayment = new Discord.EmbedBuilder()
            .setTitle("💸 | Pagamento Realizado")
            .setDescription(`✅ | Você pagou <@${recipientId}> com sucesso. Valor: \`${(amount).toLocaleString()}\` RoseCoins`)
            .setColor('Green');

        interaction.reply({ embeds: [embedPayment] });

        // Função para obter o saldo de um usuário no banco de dados
        function getBalance(userId) {
            const query = db.prepare('SELECT balance FROM users WHERE user_id = ?');
            const result = query.get(userId);
            return result ? result.balance : 0;
        }

        // Função para atualizar o saldo de um usuário no banco de dados
        function atualizarSaldo(userId, amount) {
            const query = db.prepare('INSERT INTO users (user_id, balance) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET balance = balance + ?');
            query.run(userId, amount, amount);
        }
    },
};
