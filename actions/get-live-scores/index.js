// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    competition: 'Premier League',
    home_team: 'Manchester United',
    away_team: 'Liverpool',
    score: '2 - 1',
    kickoff_time: '15:00',
    status: 'live'
  },
  {
    competition: 'Premier League',
    home_team: 'Chelsea',
    away_team: 'Arsenal',
    score: '1 - 1',
    kickoff_time: '17:30',
    status: 'finished'
  },
  {
    competition: 'La Liga',
    home_team: 'Real Madrid',
    away_team: 'Barcelona',
    score: '3 - 2',
    kickoff_time: '20:00',
    status: 'live'
  },
  {
    competition: 'World Cup',
    home_team: 'Brazil',
    away_team: 'Argentina',
    score: '-',
    kickoff_time: '22:00',
    status: 'scheduled'
  },
  {
    competition: 'World Cup',
    home_team: 'Germany',
    away_team: 'France',
    score: '0 - 1',
    kickoff_time: '18:00',
    status: 'finished'
  }
];

module.exports = async ({ date = '', competition = '' }) => {
  // Default to today if no date provided
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  // Filter matches by competition if specified
  let matches = MOCK_DATA;
  if (competition && typeof competition === 'string' && competition.trim()) {
    const comp = competition.trim().toLowerCase();
    matches = MOCK_DATA.filter(match => 
      match.competition.toLowerCase().includes(comp)
    );
  }

  // Build content summary
  let summary = '';
  if (matches.length === 0) {
    summary = competition 
      ? `No matches found for "${competition}" on ${targetDate}.`
      : `No matches found for ${targetDate}.`;
  } else {
    const liveCount = matches.filter(m => m.status === 'live').length;
    const finishedCount = matches.filter(m => m.status === 'finished').length;
    const scheduledCount = matches.filter(m => m.status === 'scheduled').length;
    
    const parts = [];
    if (liveCount > 0) parts.push(`${liveCount} live`);
    if (finishedCount > 0) parts.push(`${finishedCount} finished`);
    if (scheduledCount > 0) parts.push(`${scheduledCount} scheduled`);
    
    summary = `Found ${matches.length} match${matches.length === 1 ? '' : 'es'} for ${targetDate}`;
    if (competition) summary += ` in ${competition}`;
    summary += `: ${parts.join(', ')}.`;
  }

  return {
    content: [{ type: 'text', text: summary }],
    // structuredContent.scores — bare array outputSchema; key derived from actionName "get_live_scores"
    structuredContent: { scores: matches }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual sports data API):
 *   GET ${process.env.API_BASE_URL}/scores?date=${date}&competition=${competition}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the sports data API (e.g., https://api.sportsdata.io)
 *   API_KEY        API key for authentication (add to .env and app.config.yaml)
 *
 * Popular sports data APIs:
 *   - API-FOOTBALL (https://www.api-football.com/)
 *   - SportRadar (https://developer.sportradar.com/)
 *   - The Sports DB (https://www.thesportsdb.com/api.php)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/fixtures?date=${encodeURIComponent(date)}&league=${encodeURIComponent(competition)}`,
 *     { headers: { 'X-RapidAPI-Key': process.env.API_KEY } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.response.map(fixture => ({
 *     competition: fixture.league.name,
 *     home_team: fixture.teams.home.name,
 *     away_team: fixture.teams.away.name,
 *     score: fixture.goals.home !== null ? `${fixture.goals.home} - ${fixture.goals.away}` : '-',
 *     kickoff_time: new Date(fixture.fixture.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
 *     status: fixture.fixture.status.short === 'LIVE' ? 'live' : fixture.fixture.status.short === 'FT' ? 'finished' : 'scheduled'
 *   }))
 */