// API Base URL
const API_BASE_URL = '/api/v1';

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Forms
const addPlayerForm = document.getElementById('add-player-form');
const addMatchForm = document.getElementById('add-match-form');

// Tables
const playersTable = document.getElementById('players-table').querySelector('tbody');
const matchesTable = document.getElementById('matches-table').querySelector('tbody');
const leaderboardTable = document.getElementById('leaderboard-table').querySelector('tbody');

// Player Selects
const winnerSelect = document.getElementById('winner-id');
const loserSelect = document.getElementById('loser-id');

// Get CSRF token from cookie
function getCsrfToken() {
  const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  if (tokenCookie) {
    return decodeURIComponent(tokenCookie.split('=')[1]);
  }
  return null;
}

// Navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');
    
    // Show corresponding section
    const sectionId = link.getAttribute('data-section');
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === sectionId) {
        section.classList.add('active');
      }
    });
    
    // Load data for the active section
    if (sectionId === 'players') {
      loadPlayers();
    } else if (sectionId === 'matches') {
      loadMatches();
      loadPlayerOptions();
    } else if (sectionId === 'leaderboard') {
      loadLeaderboard();
    }
  });
});

// API Functions
async function fetchAPI(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin' // Include cookies in the request
  };
  
  // Add CSRF token for non-GET requests
  if (method !== 'GET') {
    const token = getCsrfToken();
    if (token) {
      options.headers['X-CSRF-TOKEN'] = token;
    }
  }
  
  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('CSRF token validation failed. Please refresh the page and try again.');
      }
      
      // Try to parse error as JSON
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      } catch (jsonError) {
        // If JSON parsing fails, use status text
        throw new Error(`API request failed: ${response.statusText}`);
      }
    }
    
    if (response.status === 204) {
      return null; // No content
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    alert(`Error: ${error.message}`);
    return null;
  }
}

// Player Functions
async function loadPlayers() {
  const players = await fetchAPI('/players');
  
  if (players) {
    playersTable.innerHTML = '';
    
    players.forEach(player => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${player.id}</td>
        <td>${player.name}</td>
        <td>${player.email || '-'}</td>
        <td>
          <button class="action-btn view-stats" data-id="${player.id}">Stats</button>
          <button class="action-btn delete" data-id="${player.id}">Delete</button>
        </td>
      `;
      playersTable.appendChild(row);
    });
    
    // Add event listeners for player actions
    document.querySelectorAll('.view-stats').forEach(btn => {
      btn.addEventListener('click', () => viewPlayerStats(btn.getAttribute('data-id')));
    });
    
    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', () => deletePlayer(btn.getAttribute('data-id')));
    });
  }
}

async function addPlayer(event) {
  event.preventDefault();
  
  const name = document.getElementById('player-name').value;
  const email = document.getElementById('player-email').value;
  
  const data = { name, email };
  const result = await fetchAPI('/players', 'POST', data);
  
  if (result) {
    addPlayerForm.reset();
    loadPlayers();
    alert(`Player ${name} added successfully!`);
  }
}

async function deletePlayer(id) {
  if (confirm('Are you sure you want to delete this player?')) {
    const result = await fetchAPI(`/players/${id}`, 'DELETE');
    
    if (result !== undefined) {
      loadPlayers();
      alert('Player deleted successfully!');
    }
  }
}

async function viewPlayerStats(id) {
  const stats = await fetchAPI(`/players/${id}/stats`);
  
  if (stats) {
    alert(`
      Player: ${stats.name}\n
      Wins: ${stats.wins}\n
      Losses: ${stats.losses}\n
      Total Matches: ${stats.total_matches}\n
      Win Percentage: ${stats.win_percentage}%
    `);
  }
}

async function loadPlayerOptions() {
  const players = await fetchAPI('/players');
  
  if (players) {
    // Clear existing options except the first one
    winnerSelect.innerHTML = '<option value="">Select Winner</option>';
    loserSelect.innerHTML = '<option value="">Select Loser</option>';
    
    players.forEach(player => {
      const winnerOption = document.createElement('option');
      winnerOption.value = player.id;
      winnerOption.textContent = player.name;
      winnerSelect.appendChild(winnerOption);
      
      const loserOption = document.createElement('option');
      loserOption.value = player.id;
      loserOption.textContent = player.name;
      loserSelect.appendChild(loserOption);
    });
  }
}

// Match Functions
async function loadMatches() {
  const matches = await fetchAPI('/matches');
  
  if (matches) {
    matchesTable.innerHTML = '';
    
    matches.forEach(match => {
      const row = document.createElement('tr');
      const matchDate = new Date(match.match_date || match.created_at).toLocaleDateString();
      
      row.innerHTML = `
        <td>${match.id}</td>
        <td>${match.winner ? match.winner.name : 'Unknown'}</td>
        <td>${match.loser ? match.loser.name : 'Unknown'}</td>
        <td>${match.score || '-'}</td>
        <td>${matchDate}</td>
      `;
      matchesTable.appendChild(row);
    });
  }
}

async function addMatch(event) {
  event.preventDefault();
  
  const winner_id = winnerSelect.value;
  const loser_id = loserSelect.value;
  const score = document.getElementById('match-score').value;
  
  if (winner_id === loser_id) {
    alert('Winner and loser cannot be the same player!');
    return;
  }
  
  const data = { winner_id, loser_id, score };
  const result = await fetchAPI('/matches', 'POST', data);
  
  if (result) {
    addMatchForm.reset();
    loadMatches();
    alert('Match recorded successfully!');
  }
}

// Leaderboard Functions
async function loadLeaderboard() {
  const leaderboard = await fetchAPI('/leaderboard');
  
  if (leaderboard) {
    leaderboardTable.innerHTML = '';
    
    leaderboard.forEach((player, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.wins}</td>
        <td>${player.losses}</td>
        <td>${player.total_matches}</td>
        <td>${player.win_percentage}%</td>
      `;
      leaderboardTable.appendChild(row);
    });
  }
}

// Event Listeners
addPlayerForm.addEventListener('submit', addPlayer);
addMatchForm.addEventListener('submit', addMatch);

// Initial Load
loadPlayers();