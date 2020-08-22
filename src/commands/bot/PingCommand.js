const { Command } = require('../../')

module.exports = class PingCommand extends Command {
  constructor (client) {
    super (client, {
      name: 'ping'
    })
  }

  run ({ channel }) {
    channel.send('Pong!')
  }
}
