const { Event } = require('../../')

module.exports = class MessageEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'message'
    })
  }

  run (message) {
      if (message.author.bot || message.channel.type === 'dm') return

    	const prefix = process.env.PREFIX
    	if (!message.content.startsWith(prefix)) return;

    	const args = message.content.slice(prefix.length).trim().split(/ +/g);
    	const cmd = args.shift().toLowerCase();
    	const command = this.commands.find(c => c.name === cmd)
    	if (command) command.run({ client: this, message, ...message }, ...args)
  }
}
