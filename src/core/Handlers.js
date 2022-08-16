const path = require('node:path');
const { Collection } = require('discord.js');
const glob = require('glob');

class Handlers {
    constructor(client) {
        this.client = client;
        this.events = new Events(this).load();
        this.commands = new Commands(this).load();
    }

    async load_handler(handler) {
        const pattern = process.platform.startsWith('win')
            ? (__dirname + '\\..\\commands\\**\\**.js').replace(/\\/g, '/') // glob is broken on windows
            : path.join(__dirname, '..', handler.constructor.name.toLowerCase(), '**/**.js');

        const files = await glob.sync(pattern);

        for (const file_path of files) {
            const file = require(file_path);
            handler.register(file);
        }
    }
}

class Events {
    constructor(handlers) {
        this.handlers = handlers;
    }

    load() {
        this.handlers.load_handler(this);
        return this;
    }

    register(event) {
        this.handlers.client.on(event.name, (...args) => event.run(this.handlers.client, ...args));
    }
}

class Commands extends Collection {
    constructor(handlers) {
        super();
        this.handlers = handlers;
    }

    load() {
        this.handlers.load_handler(this);
        return this;
    }

    register(command) {
        this.set(command.name, command);
    }
}

module.exports = Handlers;