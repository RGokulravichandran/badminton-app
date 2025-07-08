'use strict'

const Player = use('App/Models/Player')
const Match = use('App/Models/Match')
const Database = use('Database')

class LeaderboardController {
  // Get player statistics (wins, losses, total matches)
  async playerStats ({ params, response }) {
    const player = await Player.find(params.id)
    
    if (!player) {
      return response.status(404).json({
        message: 'Player not found',
        status: 404
      })
    }
    
    // Count wins
    const winsCount = await Match.query()
      .where('winner_id', params.id)
      .count('* as total')
    
    // Count losses
    const lossesCount = await Match.query()
      .where('loser_id', params.id)
      .count('* as total')
    
    const wins = parseInt(winsCount[0].total)
    const losses = parseInt(lossesCount[0].total)
    
    return response.json({
      player_id: player.id,
      name: player.name,
      wins,
      losses,
      total_matches: wins + losses,
      win_percentage: wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0
    })
  }
  
  // Get leaderboard (all players ranked by wins)
  async index ({ response }) {
    // Get all players with their stats
    const players = await Player.all()
    
    const leaderboard = []
    
    for (const player of players.rows) {
      // Count wins
      const winsCount = await Match.query()
        .where('winner_id', player.id)
        .count('* as total')
      
      // Count losses
      const lossesCount = await Match.query()
        .where('loser_id', player.id)
        .count('* as total')
      
      const wins = parseInt(winsCount[0].total)
      const losses = parseInt(lossesCount[0].total)
      
      leaderboard.push({
        player_id: player.id,
        name: player.name,
        wins,
        losses,
        total_matches: wins + losses,
        win_percentage: wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0
      })
    }
    
    // Sort by wins (descending), then by win percentage (descending)
    leaderboard.sort((a, b) => {
      if (a.wins !== b.wins) {
        return b.wins - a.wins
      }
      return b.win_percentage - a.win_percentage
    })
    
    return response.json(leaderboard)
  }
}

module.exports = LeaderboardController
