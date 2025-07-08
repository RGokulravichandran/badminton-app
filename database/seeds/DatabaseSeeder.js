'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const PlayerSeeder = use('./PlayerSeeder')
const MatchSeeder = use('./MatchSeeder')

class DatabaseSeeder {
  async run () {
    // Check if data already exists
    const playerCount = await Database.from('players').count('* as count').first()
    
    // Only seed if no data exists
    if (parseInt(playerCount.count) === 0) {
      // Run seeders in sequence
      await new PlayerSeeder().run()
      await new MatchSeeder().run()
      
      console.log('Database seeded successfully')
    } else {
      console.log('Database already has data, skipping seeding')
    }
  }
}

module.exports = DatabaseSeeder
