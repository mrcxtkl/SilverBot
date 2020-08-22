const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const chalk = require('chalk')

module.exports = class Silver extends Client {
  constructor(options = {}) {
    super(options)
    this.commands = []

    this.loadCommands()
  }

  log(message, { tags = [], options = ['white'] } = {}) {
    const chalkify = (m, o) => o.reduce((a, v) => (typeof a === 'function' ? a[v] : chalk[v]), [])(m)

    console.log(...tags.map(t => chalk.cyan.bold(`[${t}]`)), chalkify(message, options))
  }

  loadCommands(path = './src/commands') {
    const categories = readdirSync(`${path}/`)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}/`)

      for (const command of commands) {
        const cmd = new (require(`../${path}/${category}/${command}`))(this)
        this.commands.push(cmd)
      }
      this.log(`Os comandos da categoria ${category} foram adicionados`, { tags: ['Commands'], options: ['white', 'dim'] })
    }
  }
}
