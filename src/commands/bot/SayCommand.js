const { Command } = require('../../')

module.exports = class SayCommand extends Command {
  constructor (client) {
    super (client, {
      name: 'say'
    })
  }

  run ({ channel }, args) {
    channel.send(text)
  }
}
