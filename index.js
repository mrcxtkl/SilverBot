const Silver = require('./src/Silver')
const client = new Silver({ fetchAllMembers: true })

client.login(process.env.CLIENT_TOKEN)
