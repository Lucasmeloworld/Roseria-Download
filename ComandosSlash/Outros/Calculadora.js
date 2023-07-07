const Discord = require('discord.js');
const math = require('mathjs');

module.exports = {
  name: 'calculadora',
  description: 'Faça um calculo, Indicadores: + Adição -subtração, ^ Potencia, * Multiplicação, / divisão.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'calculo',
      description: 'Escreva a conta, use: + Adição -subtração, ^ Potencia, * Multiplicação, / divisão.',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },

  ],
  run: async (client, interaction) => {
    const expression = interaction.options.getString('calculo');
    try {
      const resultado = math.evaluate(expression);
      interaction.reply(`O resultado da sua conta é: ${resultado}`);
    } catch (error) {
      console.error(error);
      interaction.reply('❌| Não foi possível calcular a expressão matemática! Por favor, verifique se a expressão está correta e tente novamente.');
    }
  },
};
