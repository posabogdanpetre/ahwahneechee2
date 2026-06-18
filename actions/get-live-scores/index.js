// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    "competition": "CM 2026",
    "home_team": "România",
    "away_team": "Ucraina",
    "score": "2 - 1",
    "match_time": "FT",
    "match_url": "https://www.sport.ro/cm-2026/romania-ucraina"
  },
  {
    "competition": "La Liga",
    "home_team": "Real Madrid",
    "away_team": "Barcelona",
    "score": "3 - 2",
    "match_time": "FT",
    "match_url": "https://www.sport.ro/la-liga/real-madrid-barcelona"
  },
  {
    "competition": "Superliga",
    "home_team": "FCSB",
    "away_team": "CFR Cluj",
    "score": "1 - 1",
    "match_time": "HT",
    "match_url": "https://www.sport.ro/superliga/fcsb-cfr-cluj"
  },
  {
    "competition": "Superliga",
    "home_team": "Universitatea Craiova",
    "away_team": "Rapid București",
    "score": "-",
    "match_time": "19:00",
    "match_url": "https://www.sport.ro/superliga/craiova-rapid"
  }
];

module.exports = async ({ date = '', competition = '' }) => {
  // Apply filters
  let results = MOCK_DATA;

  if (competition && competition.trim()) {
    const compFilter = competition.trim().toLowerCase();
    results = results.filter(match => 
      match.competition.toLowerCase().includes(compFilter)
    );
  }

  // Generate content summary
  const dateLabel = date ? ` for ${date}` : ' for today';
  const compLabel = competition ? ` in ${competition}` : '';
  const summaryText = results.length > 0
    ? `Found ${results.length} match${results.length !== 1 ? 'es' : ''}${dateLabel}${compLabel}.`
    : `No matches found${dateLabel}${compLabel}.`;

  return {
    content: [
      { type: 'text', text: summaryText }
    ],
    // structuredContent.scores — bare array outputSchema; key derived from actionName "get_live_scores"
    structuredContent: {
      scores: results
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/live-scores?date=${date}&competition=${competition}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the sports website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams();
 *   if (date) params.append('date', date);
 *   if (competition) params.append('competition', competition);
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/live-scores?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */