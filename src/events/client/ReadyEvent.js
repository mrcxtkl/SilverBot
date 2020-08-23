const { Event } = require('../../')

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'ready'
    })
  }

  run () {
    this.log('Conexão estabelecida com o WebSocket', { tags: ['WebSocket'], options: ['white']})
    // this.emit('error', 'teste ')
  }
}
