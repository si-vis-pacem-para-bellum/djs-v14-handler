require('colors');

const { Client, GatewayIntentBits } = require('discord.js');
const config = require('../config');
const utils = require('../utils');
const Handlers = require('./Handlers');

class ExtendedClient extends Client {
    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds]
        });

        this.config = config;
        this.utils = utils;
        this.handlers = new Handlers(this);
    }

    async start() {
        try {
            await this.login(this.config.token);
            // console.log('Connected to websocket'.bold.blue);
        } catch (err) {
            console.log('An error occured', err.message);
            process.exit(0);
        }
    }
}

module.exports = ExtendedClient;