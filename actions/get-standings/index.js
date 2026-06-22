// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = {
  'Liga 1': [
    { position: 1, team: 'Persib Bandung', played: 34, won: 22, drawn: 8, lost: 4, goals_for: 68, goals_against: 28, goal_difference: 40, points: 74 },
    { position: 2, team: 'Bali United', played: 34, won: 21, drawn: 7, lost: 6, goals_for: 62, goals_against: 35, goal_difference: 27, points: 70 },
    { position: 3, team: 'Persija Jakarta', played: 34, won: 19, drawn: 9, lost: 6, goals_for: 58, goals_against: 32, goal_difference: 26, points: 66 }
  ],
  'Premier League': [
    { position: 1, team: 'Manchester City', played: 38, won: 28, drawn: 5, lost: 5, goals_for: 94, goals_against: 33, goal_difference: 61, points: 89 },
    { position: 2, team: 'Arsenal', played: 38, won: 26, drawn: 6, lost: 6, goals_for: 88, goals_against: 43, goal_difference: 45, points: 84 },
    { position: 3, team: 'Liverpool', played: 38, won: 24, drawn: 10, lost: 4, goals_for: 86, goals_against: 41, goal_difference: 45, points: 82 }
  ],
  'La Liga': [
    { position: 1, team: 'Real Madrid', played: 38, won: 29, drawn: 6, lost: 3, goals_for: 87, goals_against: 26, goal_difference: 61, points: 93 },
    { position: 2, team: 'Barcelona', played: 38, won: 27, drawn: 7, lost: 4, goals_for: 85, goals_against: 38, goal_difference: 47, points: 88 },
    { position: 3, team: 'Atletico Madrid', played: 38, won: 24, drawn: 5, lost: 9, goals_for: 70, goals_against: 43, goal_difference: 27, points: 77 }
  ]
};

module.exports = async ({ competition = '' }) => {
  if (!competition || typeof competition !== 'string' || !competition.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a competition name to get standings for.' }],
      // structuredContent.standings — bare array outputSchema; key derived from actionName "get_standings"
      structuredContent: { standings: [] }
    };
  }

  const standings = MOCK_DATA[competition.trim()] || [];

  if (standings.length === 0) {
    return {
      content: [{ type: 'text', text: `No standings data available for ${competition}.` }],
      // structuredContent.standings — bare array outputSchema; key derived from actionName "get_standings"
      structuredContent: { standings: [] }
    };
  }

  const topTeam = standings[0];
  return {
    content: [{
      type: 'text',
      text: `Found ${standings.length} teams in the ${competition} standings. ${topTeam.team} leads with ${topTeam.points} points.`
    }],
    // structuredContent.standings — bare array outputSchema; key derived from actionName "get_standings"
    structuredContent: { standings }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual sports data API):
 *   GET ${process.env.API_BASE_URL}/standings?competition=${encodeURIComponent(competition)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the sports data API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the API provider's documentation for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/standings?competition=${encodeURIComponent(competition)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data.standings || [];
 */
