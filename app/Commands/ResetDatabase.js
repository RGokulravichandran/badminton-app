'use strict'

const { Command } = require('@adonisjs/ace')
const Database = use('Database')
const Player = use('App/Models/Player')
const Match = use('App/Models/Match')
const ace = require('@adonisjs/ace')

class ResetDatabase extends Command {
  static get signature () {
    return 'reset:database'
  }

  static get description () {
    return 'Reset database by dropping tables, running migrations, and seeding data'
  }

  async handle (args, options) {
    try {
      this.info('Starting database reset...')
      
      // Drop tables if they exist
      this.info('Dropping existing tables...')
      await Database.raw('DROP TABLE IF EXISTS matches CASCADE')
      await Database.raw('DROP TABLE IF EXISTS players CASCADE')
      await Database.raw('DROP TABLE IF EXISTS tokens CASCADE')
      await Database.raw('DROP TABLE IF EXISTS users CASCADE')
      await Database.raw('DROP TABLE IF EXISTS adonis_schema CASCADE')
      
      this.success('Tables dropped successfully')
      
      // Run migrations
      this.info('Running migrations...')
      await ace.call('migration:run', {}, { silent: true })
      this.success('Migrations completed successfully')
      
      // Seed data
      this.info('Seeding database...')
      
      // Create sample players
      const players = [
        { name: 'John Smith', email: 'john.smith@example.com' },
        { name: 'Jane Doe', email: 'jane.doe@example.com' },
        { name: 'Michael Johnson', email: 'michael.johnson@example.com' },
        { name: 'Emily Davis', email: 'emily.davis@example.com' },
        { name: 'Robert Wilson', email: 'robert.wilson@example.com' }
      ]
      
      await Player.createMany(players)
      this.success('Players created successfully')
      
      // Get all players for creating matches
      const createdPlayers = await Player.all()
      const playersArray = createdPlayers.toJSON()
      
      // Create sample matches
      const matches = [
        {
          winner_id: playersArray[0].id,
          loser_id: playersArray[1].id,
          match_date: new Date(),
          score: '21-19, 21-15'
        },
        {
          winner_id: playersArray[2].id,
          loser_id: playersArray[0].id,
          match_date: new Date(),
          score: '21-18, 19-21, 21-15'
        },
        {
          winner_id: playersArray[1].id,
          loser_id: playersArray[3].id,
          match_date: new Date(),
          score: '21-10, 21-12'
        },
        {
          winner_id: playersArray[4].id,
          loser_id: playersArray[2].id,
          match_date: new Date(),
          score: '22-20, 21-18'
        },
        {
          winner_id: playersArray[0].id,
          loser_id: playersArray[4].id,
          match_date: new Date(),
          score: '21-15, 21-17'
        }
      ]
      
      await Match.createMany(matches)
      this.success('Matches created successfully')
      
      this.success('Database reset and seeded successfully')
    } catch (error) {
      this.error(`Error: ${error.message}`)
      this.error(error.stack)
    }
  }
}

module.exports = ResetDatabase
