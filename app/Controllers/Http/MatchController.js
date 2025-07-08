'use strict'

const Match = use('App/Models/Match')
const Player = use('App/Models/Player')
const Database = use('Database')

class MatchController {
  // Get all matches
  async index ({ response }) {
    const matches = await Match.query()
      .with('winner')
      .with('loser')
      .fetch()
    
    return response.json(matches)
  }

  // Get a single match
  async show ({ params, response }) {
    const match = await Match.query()
      .where('id', params.id)
      .with('winner')
      .with('loser')
      .first()
    
    if (!match) {
      return response.status(404).json({
        message: 'Match not found',
        status: 404
      })
    }

    return response.json(match)
  }

  // Create a new match
  async store ({ request, response }) {
    const data = request.only(['winner_id', 'loser_id', 'score'])
    
    // Validate that both players exist
    const winner = await Player.find(data.winner_id)
    const loser = await Player.find(data.loser_id)
    
    if (!winner || !loser) {
      return response.status(400).json({
        message: 'Both players must exist',
        status: 400
      })
    }
    
    // Validate that winner and loser are different players
    if (data.winner_id === data.loser_id) {
      return response.status(400).json({
        message: 'Winner and loser must be different players',
        status: 400
      })
    }
    
    const match = await Match.create(data)
    
    // Load relationships
    await match.load('winner')
    await match.load('loser')
    
    return response.status(201).json(match)
  }

  // Get matches for a specific player
  async playerMatches ({ params, response }) {
    const player = await Player.find(params.id)
    
    if (!player) {
      return response.status(404).json({
        message: 'Player not found',
        status: 404
      })
    }
    
    const matches = await Match.query()
      .where('winner_id', params.id)
      .orWhere('loser_id', params.id)
      .with('winner')
      .with('loser')
      .fetch()
    
    return response.json(matches)
  }
}

module.exports = MatchController
