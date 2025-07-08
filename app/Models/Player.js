'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Player extends Model {
  // Define relationships with matches
  wonMatches () {
    return this.hasMany('App/Models/Match', 'id', 'winner_id')
  }

  lostMatches () {
    return this.hasMany('App/Models/Match', 'id', 'loser_id')
  }

  // Get all matches (both won and lost)
  matches () {
    const Match = use('App/Models/Match')
    return Match.query()
      .where('winner_id', this.id)
      .orWhere('loser_id', this.id)
  }
}

module.exports = Player
