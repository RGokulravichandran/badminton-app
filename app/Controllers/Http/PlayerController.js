'use strict'

const Player = use('App/Models/Player')

class PlayerController {
  // Get all players
  async index ({ response }) {
    const players = await Player.all()
    return response.json(players)
  }

  // Get a single player
  async show ({ params, response }) {
    const player = await Player.find(params.id)
    
    if (!player) {
      return response.status(404).json({
        message: 'Player not found',
        status: 404
      })
    }

    return response.json(player)
  }

  // Create a new player
  async store ({ request, response }) {
    const data = request.only(['name', 'email'])
    
    const player = await Player.create(data)
    
    return response.status(201).json(player)
  }

  // Update a player
  async update ({ params, request, response }) {
    const player = await Player.find(params.id)
    
    if (!player) {
      return response.status(404).json({
        message: 'Player not found',
        status: 404
      })
    }
    
    const data = request.only(['name', 'email'])
    
    player.merge(data)
    await player.save()
    
    return response.json(player)
  }

  // Delete a player
  async destroy ({ params, response }) {
    const player = await Player.find(params.id)
    
    if (!player) {
      return response.status(404).json({
        message: 'Player not found',
        status: 404
      })
    }
    
    await player.delete()
    
    return response.status(204).send()
  }
}

module.exports = PlayerController
