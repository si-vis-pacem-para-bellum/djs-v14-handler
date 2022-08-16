module.exports = {
    name: 'ping',
    description: 'send the bot ping',
    run: async ({ client, interaction }) => {

        interaction.reply(`Ping: \` ${client.ws.ping}ms \``);

    }
}