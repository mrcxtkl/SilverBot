const { Command } = require('../../')

module.exports = class SayCommand extends Command {
  constructor (client) {
    super (client, {
      name: 'say'
    })
  }

  run ({ channel }, ...text) {
    channel.send(text)
  }
}
