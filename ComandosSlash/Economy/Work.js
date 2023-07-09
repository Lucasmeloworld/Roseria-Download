const Discord = require('discord.js');
const Database = require('better-sqlite3');

// Abrir conexão com o banco de dados
const db = new Database('database.db');

// Criar tabela para armazenar saldos dos usuários, se ainda não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        balance INTEGER DEFAULT 0
    )
`);

// Criar tabela para armazenar as compras dos usuários, se ainda não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS compras (
        user_id TEXT,
        item_name TEXT
    )
`);

// Função para obter as compras do usuário no banco de dados
function obterCompras(userId) {
    const query = db.prepare('SELECT item_name FROM compras WHERE user_id = ?');
    const results = query.all(userId);
    return results ? results.map((row) => row.item_name) : [];
}

// Função para atualizar o saldo e compras do usuário no banco de dados
function atualizarCompra(usuarioId, item) {
    const atualizarSaldo = db.prepare('UPDATE users SET balance = balance - ? WHERE user_id = ?');
    const inserirCompra = db.prepare('INSERT INTO compras (user_id, item_name) VALUES (?, ?)');

    // Atualizar o saldo do usuário
    atualizarSaldo.run(item.price, usuarioId);

    // Inserir a compra do usuário no registro de compras
    inserirCompra.run(usuarioId, item.name);
}

module.exports = {
    name: "work",
    description: "[Economia] Trabalhe para ganhar dinheiro",
    type: Discord.ApplicationCommandType.ChatInput,
    cooldowns: new Map(),

    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const cooldownDuration = 5 * 60 * 60 * 1000; // 5 horas em milissegundos

        // Verificar se o usuário está em cooldown
        if (module.exports.cooldowns.has(userId)) {
            const cooldownEnd = module.exports.cooldowns.get(userId);
            const remainingTime = cooldownEnd - Date.now();
            if (remainingTime > 0) {
                const remainingTimeString = formatTime(remainingTime);

                // Mensagem de erro de cooldown
                const embedCooldown = new Discord.EmbedBuilder()
                    .setTitle("⏳ | Cooldown")
                    .setDescription(`Você precisa esperar um pouco para trabalhar novamente.\n Aguarde \`${remainingTimeString}\``)
                    .setColor("#ff0000");

                return interaction.reply({ embeds: [embedCooldown] });
            }
        }

        // Verificar se o usuário possui a maleta da sorte com o multiplicador
        const compras = obterCompras(userId);
        const multiplicador = compras.includes("⏳ | Hora extra") ? 2 : 1;

        // Simular um trabalho e gerar um valor aleatório
        const amount = Math.floor(Math.random() * 500) + 1;

        // Calcular o valor final considerando o multiplicador
        const finalAmount = Math.floor(amount * multiplicador);

        // Verificar se o usuário já existe na tabela antes de inserir um novo registro
        const checkUserQuery = db.prepare('SELECT user_id FROM users WHERE user_id = ?');
        const userExists = checkUserQuery.get(userId);

        if (userExists) {
            // Atualizar o saldo do usuário existente
            const updateBalanceQuery = db.prepare('UPDATE users SET balance = balance + ? WHERE user_id = ?');
            updateBalanceQuery.run(finalAmount, userId);
        } else {
            // Inserir um novo registro para o usuário
            const insertUserQuery = db.prepare('INSERT INTO users (user_id, balance) VALUES (?, ?)');
            insertUserQuery.run(userId, finalAmount);
        }

        // Definir o tempo de cooldown para o usuário
        const cooldownEnd = Date.now() + cooldownDuration;
        module.exports.cooldowns.set(userId, cooldownEnd);

        // Mensagens aleatórias de sucesso
        const successMessages = [
            `💰 | Ótimo trabalho! Você ganhou \`${finalAmount}\` Ncoins.`,
            `💵 | Incrível! Você ganhou \`${finalAmount}\` Ncoins pelo seu trabalho.`,
            `🤑 | Parabéns! Você ganhou \`${finalAmount}\` Ncoins!`,
            `🌟 | Bom trabalho! Você ganhou \`${finalAmount}\` Ncoins pelo seu esforço.`,
        ];

        // Selecionar uma mensagem aleatória
        const randomIndex = Math.floor(Math.random() * successMessages.length);
        const successMessage = successMessages[randomIndex];

        // Enviar mensagem de sucesso ao usuário
        let embedSuccess = new Discord.EmbedBuilder()
            .setTitle("✅ | Trabalho concluído!")
            .setDescription(successMessage)
            .setColor('Green');

        interaction.reply({ embeds: [embedSuccess] });
    },
};

// Função auxiliar para formatar o tempo restante em uma string legível
function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    const secondsString = seconds.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
    const hoursString = hours.toString().padStart(2, "0");

    return `${hoursString}:${minutesString}:${secondsString}`;
}
