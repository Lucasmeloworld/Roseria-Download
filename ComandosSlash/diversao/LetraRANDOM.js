const Discord = require('discord.js')

module.exports = {

    name: "sortear-letra", 
    description: "[Diversão] Sorteie uma letra aleatoria do alfabeto.", 
    type: Discord.ApplicationCommandType.ChatInput,
   
    run: async (client, interaction) => {

      

      var Resposta1 = [        
        'A letra sorteada é **A**!',
        'A letra sorteada é **B**!',
        'A letra sorteada é **C**!',
        'A letra sorteada é **D**!',
        'A letra sorteada é **E**!',
        'A letra sorteada é **F**!',
        'A letra sorteada é **G**!',
        'A letra sorteada é **H**!',
        'A letra sorteada é **I**!',
        'A letra sorteada é **J**!',
        'A letra sorteada é **K**!',
        'A letra sorteada é **L**!',
        'A letra sorteada é **M**!',
        'A letra sorteada é **N**!',
        'A letra sorteada é **O**!',
        'A letra sorteada é **P**!',
        'A letra sorteada é **Q**!',
        'A letra sorteada é **R**!',
        'A letra sorteada é **S**!',
        'A letra sorteada é **T**!',
        'A letra sorteada é **U**!',
        'A letra sorteada é **V**!',
        'A letra sorteada é **W**!',
        'A letra sorteada é **X**!',
        'A letra sorteada é **Y**!',
        'A letra sorteada é **Z**!',
            ];
  
      var random1 = Resposta1[Math.floor(Math.random() * Resposta1.length)];
  
      interaction.reply({ content: random1 })
      
      
        }
      }