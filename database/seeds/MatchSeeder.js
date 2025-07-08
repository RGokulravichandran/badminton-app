'use strict'

/*
|--------------------------------------------------------------------------
| MatchSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Match = use('App/Models/Match')
const Player = use('App/Models/Player')
const Database = use('Database')

class MatchSeeder {
  async run () {
    // Get all players
    const players = await Player.all()
    
    // If no players exist, exit
    if (players.rows.length === 0) {
      console.log('No players found. Please run PlayerSeeder first.')
      return
    }
    
    // Create sample matches
    const matches = [
      {
        winner_id: 1,
        loser_id: 2,
        match_date: new Date('2023-07-15'),
        score: '21-18, 21-15'
      },
      {
        winner_id: 3,
        loser_id: 4,
        match_date: new Date('2023-07-16'),
        score: '21-19, 19-21, 21-17'
      },
      {
        winner_id: 5,
        loser_id: 6,
        match_date: new Date('2023-07-17'),
        score: '21-14, 21-10'
      },
      {
        winner_id: 7,
        loser_id: 8,
        match_date: new Date('2023-07-18'),
        score: '21-16, 21-18'
      },
      {
        winner_id: 1,
        loser_id: 3,
        match_date: new Date('2023-07-20'),
        score: '21-15, 21-17'
      },
      {
        winner_id: 2,
        loser_id: 4,
        match_date: new Date('2023-07-21'),
        score: '21-18, 21-19'
      },
      {
        winner_id: 5,
        loser_id: 7,
        match_date: new Date('2023-07-22'),
        score: '21-13, 21-16'
      },
      {
        winner_id: 6,
        loser_id: 8,
        match_date: new Date('2023-07-23'),
        score: '21-17, 21-14'
      },
      {
        winner_id: 1,
        loser_id: 5,
        match_date: new Date('2023-07-25'),
        score: '21-19, 21-18'
      },
      {
        winner_id: 3,
        loser_id: 7,
        match_date: new Date('2023-07-26'),
        score: '21-16, 21-15'
      },
      {
        winner_id: 2,
        loser_id: 6,
        match_date: new Date('2023-07-27'),
        score: '21-14, 21-12'
      },
      {
        winner_id: 4,
        loser_id: 8,
        match_date: new Date('2023-07-28'),
        score: '21-17, 21-19'
      }
    ]
    
    // Insert matches into database
    await Match.createMany(matches)
    
    console.log('Matches seeded successfully')
  }
}

module.exports = MatchSeeder
