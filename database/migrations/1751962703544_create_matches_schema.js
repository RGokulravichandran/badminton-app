'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateMatchesSchema extends Schema {
  up () {
    this.create('matches', (table) => {
      table.increments()
      table.integer('winner_id').unsigned().references('id').inTable('players').onDelete('CASCADE')
      table.integer('loser_id').unsigned().references('id').inTable('players').onDelete('CASCADE')
      table.date('match_date').defaultTo(this.fn.now())
      table.string('score').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('matches')
  }
}

module.exports = CreateMatchesSchema
