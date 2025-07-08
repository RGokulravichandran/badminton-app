'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Match extends Model {
  // Define relationships with players
  winner () {
    return this.belongsTo('App/Models/Player', 'winner_id')
  }

  loser () {
    return this.belongsTo('App/Models/Player', 'loser_id')
  }
}

module.exports = Match
