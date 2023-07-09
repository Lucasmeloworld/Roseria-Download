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

// COMANDO DE APOSTA
module.exports = {
    name: "apostar",
    description: "[Economia] Faça uma aposta",
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const userBalance = obterSaldo(userId);
      // Verificar se o usuário já possui um registro no banco de dados
      const userRow = db.prepare("SELECT balance FROM users WHERE user_id = ?").get(userId);

      let balance = 0;

      if (userRow) {
          // O usuário já possui um registro, obter o saldo atual
          balance = userRow.balance;
      }
        // Verificar se o usuário possui saldo suficiente para a aposta
        if (userBalance < 250) {
            let embedInsufficientFunds = new Discord.EmbedBuilder()
                .setTitle("❌ | Saldo Insuficiente")
                .setDescription("⚠️ | Você não possui saldo suficiente para fazer essa aposta.")
                .setColor('Red');
            return interaction.reply({ embeds: [embedInsufficientFunds] });
        }

        // Realizar a aposta
        const chanceDeGanhar = 0.5; // 5% de chance de ganhar
        const ganhou = Math.random() < chanceDeGanhar;
        const valorAposta = 250;
        const premio = 5000;

        if (ganhou) {
            atualizarSaldo(userId, premio - valorAposta);
            let embedWin = new Discord.EmbedBuilder()
                .setTitle("🎉 | Parabéns! Você ganhou!")
                .setDescription(`Você ganhou \`${(premio).toLocaleString()}\` RoseCoins!`)
                .setColor('Green');
            return interaction.reply({ embeds: [embedWin] });
        } else {
            atualizarSaldo(userId, -valorAposta);
            let embedLoss = new Discord.EmbedBuilder()
                .setTitle("😔 | Infelizmente você perdeu.")
                .setDescription(`Você perdeu ${valorAposta} RoseCoins.`)
                .setColor('Red');
            return interaction.reply({ embeds: [embedLoss] });
        }
    },
};

// Função para obter o saldo da carteira do usuário no banco de dados
function obterSaldo(userId) {
    const query = db.prepare('SELECT balance FROM users WHERE user_id = ?');
    const result = query.get(userId);
    return result ? result.balance : 0;
}

// Função para atualizar o saldo da carteira do usuário no banco de dados
function atualizarSaldo(userId, amount) {
    const query = db.prepare('INSERT INTO users (user_id, balance) VALUES (?, ?) ON CONFLICT (user_id) DO UPDATE SET balance = balance + ?');
    query.run(userId, amount, amount);
}
