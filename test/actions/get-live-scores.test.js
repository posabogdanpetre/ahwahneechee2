const handler = require('../../actions/get-live-scores/index.js');

describe('get_live_scores', () => {
  it('returns all matches when no filters provided', async () => {
    const result = await handler({});
    
    expect(result.content).toContain('match');
    expect(result.structuredContent).toHaveProperty('scores');
    expect(Array.isArray(result.structuredContent.scores)).toBe(true);
    expect(result.structuredContent.scores.length).toBeGreaterThan(0);
    
    // Verify match structure
    const match = result.structuredContent.scores[0];
    expect(match).toHaveProperty('competition');
    expect(match).toHaveProperty('home_team');
    expect(match).toHaveProperty('away_team');
    expect(match).toHaveProperty('score');
    expect(match).toHaveProperty('match_time');
    expect(match).toHaveProperty('status');
  });

  it('filters matches by competition', async () => {
    const result = await handler({ competition: 'Premier League' });
    
    expect(result.content).toContain('Premier League');
    expect(result.structuredContent.scores).toBeDefined();
    
    // All returned matches should be from Premier League
    result.structuredContent.scores.forEach(match => {
      expect(match.competition.toLowerCase()).toContain('premier league');
    });
  });

  it('returns empty array for non-existent competition', async () => {
    const result = await handler({ competition: 'Non-Existent League' });
    
    expect(result.structuredContent.scores).toEqual([]);
    expect(result.content).toContain('0 match');
  });

  it('handles date parameter', async () => {
    const result = await handler({ date: '2026-06-17' });
    
    // Date filtering is a no-op with mock data but handler should accept it
    expect(result.structuredContent).toHaveProperty('scores');
    expect(result.content).toBeDefined();
  });

  it('case-insensitive competition filter', async () => {
    const result = await handler({ competition: 'la liga' });
    
    expect(result.structuredContent.scores.length).toBeGreaterThan(0);
    result.structuredContent.scores.forEach(match => {
      expect(match.competition.toLowerCase()).toContain('la liga');
    });
  });
});