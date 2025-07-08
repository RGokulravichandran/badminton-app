'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Serve the frontend from public directory
Route.get('/', ({ response }) => {
  return response.download('public/index.html')
})

// Serve static assets
Route.get('/:file', ({ params, response }) => {
  return response.download(`public/${params.file}`)
})

// API Routes
Route.group(() => {
  // Player routes
  Route.get('players', 'PlayerController.index')
  Route.get('players/:id', 'PlayerController.show')
  Route.post('players', 'PlayerController.store')
  Route.put('players/:id', 'PlayerController.update')
  Route.delete('players/:id', 'PlayerController.destroy')
  
  // Match routes
  Route.get('matches', 'MatchController.index')
  Route.get('matches/:id', 'MatchController.show')
  Route.post('matches', 'MatchController.store')
  Route.get('players/:id/matches', 'MatchController.playerMatches')
  
  // Leaderboard routes
  Route.get('leaderboard', 'LeaderboardController.index')
  Route.get('players/:id/stats', 'LeaderboardController.playerStats')
}).prefix('api/v1')
