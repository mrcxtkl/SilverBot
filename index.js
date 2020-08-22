const Silver = require('./src/Silver')
const client = new Silver({ fetchAllMembers: true })

client.on('ready', () => {
  client.log('Conexão estabelecida com o WebSocket', { tags: ['WebSocket'], options: ['white']})
})

client.on('message', message => {
  if (message.author.bot || message.channel.type === 'dm') return;

	const prefix = process.env.PREFIX

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command = client.commands.find(c => c.name.toLowerCase() === cmd)
	if (command) command.run({ client, message }, ...args)
})

client.login(process.env.CLIENT_TOKEN)
