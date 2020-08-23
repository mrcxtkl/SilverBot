const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const chalk = require('chalk')

module.exports = class Silver extends Client {
  constructor(options = {}) {
    super(options)
    this.commands = []

    this.loadCommands()
    this.loadEvents()
  }

  log(message, { tags = [], options = ['white'] } = {}) {
    const chalkify = (m, o) => o.reduce((a, v) => (typeof a === 'function' ? a[v] : chalk[v]), [])(m)

    console.log(...tags.map(t => chalk.cyan.bold(`[${t}]`)), chalkify(message, options))
  }

  loadCommands(path = './src/commands') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}/`).filter(d => d.endsWith('.js'))

      for (const command of commands) {
        const cmd = new (require(`../${path}/${category}/${command}`))(this)
        this.commands.push(cmd)
      }
      this.log(`Os comandos da categoria ${category} foram adicionados`, { tags: ['Commands'], options: ['white', 'dim'] })
    }
  }

  loadEvents(path = './src/events') {
    const categories = readdirSync(path)

    for (const category of categories) {
    const events = readdirSync(`${path}/${category}/`).filter(d => d.endsWith('.js'))

     for (const event of events) {
       const evt = new (require(`../${path}/${category}/${event}`))(this)
       this.on(evt.name, evt.run)
     }
     this.log(`Os eventos da categoria ${category} foram adicionados`, { tags: ['Events'], options: ['white', 'dim'] })
   }
  }
}
