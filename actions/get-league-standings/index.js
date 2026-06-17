// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = {
  'Premier League': [
    {
      position: 1,
      team: 'Manchester City',
      matches_played: 32,
      wins: 25,
      draws: 4,
      losses: 3,
      goals_for_against: '78-23',
      points: 79,
      form: 'WWWDW'
    },
    {
      position: 2,
      team: 'Arsenal',
      matches_played: 32,
      wins: 24,
      draws: 5,
      losses: 3,
      goals_for_against: '72-28',
      points: 77,
      form: 'WDWWW'
    },
    {
      position: 3,
      team: 'Liverpool',
      matches_played: 32,
      wins: 23,
      draws: 6,
      losses: 3,
      goals_for_against: '69-30',
      points: 75,
      form: 'DWWWL'
    }
  ],
  'La Liga': [
    {
      position: 1,
      team: 'Real Madrid',
      matches_played: 30,
      wins: 23,
      draws: 5,
      losses: 2,
      goals_for_against: '68-19',
      points: 74,
      form: 'WWWWW'
    },
    {
      position: 2,
      team: 'Barcelona',
      matches_played: 30,
      wins: 21,
      draws: 6,
      losses: 3,
      goals_for_against: '62-25',
      points: 69,
      form: 'WDWWW'
    }
  ],
  'Superliga': [
    {
      position: 1,
      team: 'FC Copenhagen',
      matches_played: 26,
      wins: 18,
      draws: 5,
      losses: 3,
      goals_for_against: '54-22',
      points: 59,
      form: 'WWDWW'
    },
    {
      position: 2,
      team: 'FC Midtjylland',
      matches_played: 26,
      wins: 16,
      draws: 6,
      losses: 4,
      goals_for_against: '48-26',
      points: 54,
      form: 'DWWDW'
    }
  ]
}

module.exports = async ({ league, season = '2025' }) => {
  // Validate required parameter
  if (!league || typeof league !== 'string' || !league.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a league name to retrieve standings.' }],
      structuredContent: { standings: [] }
    }
  }

  const normalizedLeague = league.trim()

  // Look up standings for the requested league
  const standings = MOCK_DATA[normalizedLeague] || []

  if (standings.length === 0) {
    return {
      content: [{ type: 'text', text: `No standings found for ${normalizedLeague} (${season}).` }],
      structuredContent: { standings: [] }
    }
  }

  // Build content text summary
  const topThree = standings.slice(0, 3).map(t => `${t.position}. ${t.team} (${t.points} pts)`).join(', ')
  const contentText = `${normalizedLeague} ${season} standings: ${topThree}. Showing ${standings.length} teams.`

  return {
    content: [{ type: 'text', text: contentText }],
    // structuredContent.standings — bare array outputSchema; key derived from actionName "get_league_standings"
    structuredContent: { standings }
  }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual API):
 *   GET ${process.env.API_BASE_URL}/leagues/${encodeURIComponent(league)}/standings?season=${season}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the football data API (e.g., https://api.football-data.org/v4)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: many football data APIs require an API key header:
 *   headers: { 'X-Auth-Token': process.env.API_KEY }
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/leagues/${encodeURIComponent(league)}/standings?season=${season}`,
 *     { headers: { 'X-Auth-Token': process.env.API_KEY } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.standings || []
 */