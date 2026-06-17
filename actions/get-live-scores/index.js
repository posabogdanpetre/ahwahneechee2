// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
  {
    competition: "Premier League",
    home_team: "Manchester United",
    away_team: "Liverpool",
    score: "2 - 1",
    match_time: "45'",
    status: "live"
  },
  {
    competition: "Premier League",
    home_team: "Arsenal",
    away_team: "Chelsea",
    score: "1 - 1",
    match_time: "72'",
    status: "live"
  },
  {
    competition: "La Liga",
    home_team: "Real Madrid",
    away_team: "Barcelona",
    score: "3 - 2",
    match_time: "FT",
    status: "finished"
  },
  {
    competition: "Bundesliga",
    home_team: "Bayern Munich",
    away_team: "Borussia Dortmund",
    score: "-",
    match_time: "19:30",
    status: "scheduled"
  }
];

module.exports = async (args = {}) => {
  const { date, competition } = args;

  // TODO: Replace with real API call
  // const response = await fetch(`${process.env.SCORES_API_BASE_URL}/matches?date=${date || 'today'}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.SCORES_API_KEY}` }
  // });
  // const data = await response.json();

  let filtered = MOCK_DATA;

  // Filter by competition if provided
  if (competition) {
    filtered = filtered.filter(match => 
      match.competition.toLowerCase().includes(competition.toLowerCase())
    );
  }

  // Note: date filtering would be applied in production with real API

  // Generate content summary
  const liveCount = filtered.filter(m => m.status === 'live').length;
  const finishedCount = filtered.filter(m => m.status === 'finished').length;
  const scheduledCount = filtered.filter(m => m.status === 'scheduled').length;
  
  let content = `Found ${filtered.length} match${filtered.length !== 1 ? 'es' : ''}`;
  if (competition) {
    content += ` in ${competition}`;
  }
  content += `: ${liveCount} live, ${finishedCount} finished, ${scheduledCount} scheduled.`;

  return {
    content,
    // structuredContent.scores — bare array outputSchema; key derived from actionName "get_live_scores"
    structuredContent: {
      scores: filtered
    }
  };
};