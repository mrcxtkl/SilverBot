const { Event } = require('../../')

module.exports = class ErrorEvent extends Event {
  constructor(client) {
    super(client, {
      name: 'error'
    })
  }

  run (error) {
    this.log(error, { tags: ['ErrorEvent'], options: ['red', 'bold' ] })
    process.exit(1)
  }
}
