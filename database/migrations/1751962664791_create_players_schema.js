'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePlayersSchema extends Schema {
  up () {
    this.create('players', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('email').nullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('players')
  }
}

module.exports = CreatePlayersSchema
