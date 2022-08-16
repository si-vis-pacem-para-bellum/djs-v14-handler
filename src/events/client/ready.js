const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.username} is ready`);

        client.user.setPresence('<3', {
            type: ActivityType.Streaming,
            url: 'https://twitch.tv/login'
        });

        console.log('https://discord.com/api/oauth2/authorize?' + new URLSearchParams({
            client_id: client.user.id,
            permissions: 8,
            scope: 'bot'
        }).toString());

        await client.application?.commands.set([...client.handlers.commands.values()], client.config?.guild_id?.length > 1 ? client.config.guild_id : null);

        console.log(`${client.handlers.commands.size} command${client.handlers.commands.size > 1 ? 's' : ''} was loaded`);
    }
}