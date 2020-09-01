const { Command } = require('../../')
const util = require('util')

module.exports = class EvalCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'eval'
    })
  }

  async run ({ message, channel, author }, args) {
    if (author.id !== '610663056925523998') return;
    try {
      const evaled = await eval(args.join(' ').replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
      const cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 })).replace((new RegExp(this.client.token, 'g')), this.client.token.split('.')
      .map((val, i) => (i > 0 ? val.replace(/./g, '*') : val))
      .join('.'))
      await channel.send(cleanEvaled, { code: 'xl' })
    } catch (err) {
      channel.send('```xl\n' + this.clean(err) + '\n```')
    }
  }

  clean (text) {
    const blankSpace = String.fromCharCode(8203)
    return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
  }
}
