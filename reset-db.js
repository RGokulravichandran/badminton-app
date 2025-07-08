'use strict'

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireWith('reset-db')
  .then(async () => {
    const Database = use('Database')
    
    try {
      // Drop tables if they exist
      await Database.raw('DROP TABLE IF EXISTS matches CASCADE')
      await Database.raw('DROP TABLE IF EXISTS players CASCADE')
      
      console.log('Tables dropped successfully')
      
      // Run migrations
      const ace = require('@adonisjs/ace')
      await ace.call('migration:run', {}, { silent: false })
      
      console.log('Migrations completed successfully')
      
      // Run seeders
      const PlayerSeeder = require('./database/seeds/PlayerSeeder')
      const MatchSeeder = require('./database/seeds/MatchSeeder')
      
      await new PlayerSeeder().run()
      await new MatchSeeder().run()
      
      console.log('Database seeded successfully')
      process.exit(0)
    } catch (error) {
      console.error('Error:', error)
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })