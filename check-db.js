'use strict'

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireWith('check-db')
  .then(() => {
    const Database = use('Database')
    return Database.table('players').select('*')
  })
  .then((players) => {
    console.log('Players in database:', players)
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })