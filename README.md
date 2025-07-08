# Badminton League Manager Application

A full-stack application for managing badminton players, matches, and leaderboards built with AdonisJS.

## Features

- Player Management: Add, view, update, and delete players
- Match Tracking: Record match results with scores
- Leaderboard: View player rankings and statistics
- Simple and intuitive UI

## Prerequisites

- Node.js (>= 8.0.0)
- npm or yarn
- PostgreSQL database

## Setup Instructions

Follow these steps to set up and run the application after cloning from Git:

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment

Copy the example environment file and update it with your database credentials:

```bash
cp .env.example .env
```

Edit the `.env` file and update the following variables:

```
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=badminton_league
```

### 3. Set Up the Database

Create a PostgreSQL database with the name specified in your `.env` file:

```sql
CREATE DATABASE badminton_league;
```

### 4. Run Migrations and Seed Data

Set up the database schema and populate it with sample data:

```bash
# Run migrations to create tables
adonis migration:run

# Seed the database with sample data
adonis seed

# Alternatively, use our custom reset command to reset and seed the database
adonis reset:database
```

### 5. Start the Development Server

```bash
adonis serve --dev
```

The application will be available at http://localhost:3333 (or the port specified in your .env file).

## API Endpoints

The application provides the following API endpoints:

### Players
- `GET /api/v1/players` - List all players
- `GET /api/v1/players/:id` - Get a specific player
- `POST /api/v1/players` - Create a new player
- `PUT /api/v1/players/:id` - Update a player
- `DELETE /api/v1/players/:id` - Delete a player
- `GET /api/v1/players/:id/stats` - Get player statistics
- `GET /api/v1/players/:id/matches` - Get player matches

### Matches
- `GET /api/v1/matches` - List all matches
- `GET /api/v1/matches/:id` - Get a specific match
- `POST /api/v1/matches` - Create a new match

### Leaderboard
- `GET /api/v1/leaderboard` - Get the leaderboard

## Troubleshooting

### CSRF Protection

If you encounter 403 Forbidden errors when making POST, PUT, or DELETE requests, it may be due to CSRF protection. The application is configured to handle CSRF tokens automatically, but you may need to refresh the page to get a new token.

### Database Issues

If you encounter database-related issues, you can reset the database using the custom command:

```bash
adonis reset:database
```

## License

MIT
