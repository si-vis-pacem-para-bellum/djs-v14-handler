const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {

        if (interaction.type !== InteractionType.ApplicationCommand) return;

        const cmd = client.handlers.commands.get(interaction.commandName);
        if (!cmd) return;

        cmd.run({ client, interaction });

    }
}