const Discord = require('discord.js')

module.exports = {
    name: "say-embed",
    description: '[Outros] Me peça para enviar algo em forma de embed.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
       
        {
            name: "canal",
            description: "selecione o canal",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "texto",
            description: "Escreva o texto",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name:"cor",
            description:"Selecione a cor do embed.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name:'Aleatorio',
                    value:"Random",
                },
                {
                    name:'Amarelo',
                    value:"Yellow",
                },
                {
                    name:'Amarelo pastel(Roseria)',
                    value:"fff9ad",
                },
                {
                    name:'Azul',
                    value:"Blue",
                },
                {
                    name:'Branco',
                    value:"White",
                },
                {
                    name:'Ciano',
                    value:"38ffee",
                },

                {
                    name:'Cinza',
                    value:"Grey",
                },
                {
                    name:'Laranja',
                    value:"Orange",
                },
                {
                    name:'Preto',
                    value:"Black",
                },
                {
                    name:'Rosa',
                    value:"ff46c0",
                },
                {
                    name:'Roxo',
                    value:"Purple",
                },
                {
                    name:"Verde",
                    value:"Green",
                },
                {
                    name: "Vermelho",
                    value: "Red",
                },
            ]  
        },
        {
            name: "thumbnail-url",
            description: "Coloque um link de imagem para ser exibida como uma Thumbnail.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "imagem-url",
            description: "Coloque um link de imagem para ser exibida como uma imagem.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name:"footer",
            description:"Coloque uma mensagem no rodapé",
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "footer-avatar-url",
            description: "Coloque uma imagem no rodapé",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,

        },
        {
            name: "titulo",
            description: "Titulo da mensagem",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,

        },
        {
            name: "field-name",
            description: "Adicione um Field ao embed.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,

        },
        {
            name: "field-value",
            description: "Adicione uma descrição ao Field.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,

        },



    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
            interaction.reply({content:`Você não possui permissão para utilizar este comando.`, ephemeral: true});
        } else {
        //Os valores a Obter
        const texto = interaction.options.getString('texto');
        const canal = interaction.options.getChannel('canal');
        const titulo = interaction.options.getString('titulo');
        const thumbnail = interaction.options.getString('thumbnail');
        const imagem = interaction.options.getString('imagem');
        const cor = interaction.options.getString('cor');
        const footer = interaction.options.getString('footer');
        const FieldName = interaction.options.getString('field-value');
        const FieldValue =interaction.options.getString('field-description');
        const FooterURL = interaction.options.getString('footer-avatar-url')

        
        
        //Embed Personalizado
        let embed = new Discord.EmbedBuilder()  
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) }) 
        .setTitle(titulo)
        .setDescription(texto)
        .setColor(cor || 'Yellow')
        .setThumbnail(thumbnail)
        .setImage(imagem)
        .setFooter({ text:footer, iconURL:FooterURL})

        //Verifica se o usuario preencheu "FieldName" e se preencheu adiciona um Field ao embed e se "FieldValue" estiver vazio preenche com um espaço.
        if (FieldName == String.length > 0){
            if(!FieldValue){FieldValue = ' '}
            embed.addFields({ name: FieldName, value: FieldValue });

        }
        //envia a msg
        canal.send({embeds: [embed], content:`*Mensagem de ${interaction.user.username}*`})
    
      .then(() => {
      interaction.reply({embeds: [embed], content:`✅ | Mensagem enviada com sucesso em ${canal}`, ephemeral: true});
    })
    .catch(error => {
      console.error(error);
      interaction.reply({content:`⚠ | Não foi possível enviar a mensagem em ${canal}.`,  ephemeral: true});
    });
    
    
 

}
}
}