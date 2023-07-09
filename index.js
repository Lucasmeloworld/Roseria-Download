const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds,
Discord.GatewayIntentBits.GuildMessages,
Discord.GatewayIntentBits.MessageContent,
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Ocorreu um erro de interação fantasma. Se houver, desligue outras instancias que estou ligad@`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})




client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)
