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

    // Atualizar o saldo do usuário
    atualizarSaldo.run(item.price, usuarioId);

    // Inserir a compra do usuário no registro de compras
    inserirCompra.run(usuarioId, item.name);

}

const cooldowns = new Map();

// Função para formatar o tempo restante em formato hh:mm:ss
function formatTime(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const hoursString = (hours < 10) ? `0${hours}` : hours;
    const minutesString = (minutes < 10) ? `0${minutes}` : minutes;
    const secondsString = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hoursString}:${minutesString}:${secondsString}`;
}

module.exports = {
    name: "daily",
    description: "Recebe uma quantia diária aleatória de dinheiro",
    type: Discord.ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const cooldownDuration = 12 * 60 * 60 * 1000;

        // Verificar se o usuário está em cooldown
        if (cooldowns.has(userId)) {
            const cooldownEnd = cooldowns.get(userId);
            const remainingTime = cooldownEnd - Date.now();
            if (remainingTime > 0) {
                const remainingTimeString = formatTime(remainingTime);

                let embedCooldown = new Discord.EmbedBuilder()
                    .setTitle(`❌ | Acho que você se esqueceu de algo...`)
                    .setDescription(`⏳ | Você deve aguardar \`${remainingTimeString}\` para resgatar sua recompensa diária.`)
                    .setColor('Red');

                return interaction.reply({ embeds: [embedCooldown] });
            }
        }

        // Definir o tempo de término do cooldown
        const cooldownEnd = Date.now() + cooldownDuration;
        cooldowns.set(userId, cooldownEnd);

        // Verificar se o usuário já possui um registro no banco de dados
        const userRow = db.prepare("SELECT balance FROM users WHERE user_id = ?").get(userId);

        let balance = 0;

        if (userRow) {
            // O usuário já possui um registro, obter o saldo atual
            balance = userRow.balance;
        }

        const minAmount = 1000;
        const maxAmount = 5000;

        // Gera um número aleatório entre minAmount e maxAmount
        let amount = Math.floor(Math.random() * (maxAmount - minAmount + 1) + minAmount);

        // Verificar se o usuário possui o item "✨ | Estrelas do desejo「Multiplicador」"
        const hasMultiplier = obterCompras(userId).includes("✨ | Estrelas do desejo「Multiplicador」");
        if (hasMultiplier) {
            // 5% de chance de dobrar a recompensa
            if (Math.random() < 100) {
                amount *= 2;
                 // Atualizar o saldo do usuário no banco de dados
        if (userRow) {
            db.prepare("UPDATE users SET balance = balance + ? WHERE user_id = ?").run(amount, userId);
        } else {
            db.prepare("INSERT INTO users (user_id, balance) VALUES (?, ?)").run(userId, amount);
        }

        let embedDaily = new Discord.EmbedBuilder()
        .setTitle(`✨ | Recompensa diária resgatada e dobrada!`)
        .addFields(
            { name: 'Valor obtido:', value: `\`${amount.toLocaleString()}\` RoseCoins`, inline: true },
            { name: 'Saldo atual:', value: `\`${(balance + amount).toLocaleString()}\` RoseCoins`, inline: true },
        )
        .setColor('Yellow');

    // Enviar a resposta ao usuário
    interaction.reply({ embeds: [embedDaily] })
    return
            }
        }

        // Atualizar o saldo do usuário no banco de dados
        if (userRow) {
            db.prepare("UPDATE users SET balance = balance + ? WHERE user_id = ?").run(amount, userId);
        } else {
            db.prepare("INSERT INTO users (user_id, balance) VALUES (?, ?)").run(userId, amount);
        }

        let embedDaily = new Discord.EmbedBuilder()
            .setTitle(`✅ | Recompensa diária resgatada!`)
            .addFields(
                { name: 'Valor obtido:', value: `\`${amount.toLocaleString()}\` RoseCoins`, inline: true },
                { name: 'Saldo atual:', value: `\`${(balance + amount).toLocaleString()}\` RoseCoins`, inline: true },
            )
            .setColor('Yellow');

        // Enviar a resposta ao usuário
        interaction.reply({ embeds: [embedDaily] });
    }
};
