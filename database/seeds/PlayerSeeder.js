'use strict'

/*
|--------------------------------------------------------------------------
| PlayerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Player = use('App/Models/Player')
const Database = use('Database')

class PlayerSeeder {
  async run () {
    // Create sample players
    const players = [
      {
        name: 'John Smith',
        email: 'john.smith@example.com'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com'
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@example.com'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com'
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@example.com'
      },
      {
        name: 'Jessica Brown',
        email: 'jessica.brown@example.com'
      },
      {
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com'
      },
      {
        name: 'Amanda Martinez',
        email: 'amanda.martinez@example.com'
      }
    ]
    
    // Insert players into database
    await Player.createMany(players)
    
    console.log('Players seeded successfully')
  }
}

module.exports = PlayerSeeder
