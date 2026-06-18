const handler = require('../../actions/get-live-scores/index.js');

describe('get_live_scores handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ date: '2026-06-18' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({});
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.scores contains match data', async () => {
    const out = await handler({});
    expect(out.structuredContent).toHaveProperty('scores');
    expect(Array.isArray(out.structuredContent.scores)).toBe(true);
    expect(out.structuredContent.scores.length).toBeGreaterThan(0);
  });

  test('filters by competition when provided', async () => {
    const out = await handler({ competition: 'Superliga' });
    const scores = out.structuredContent.scores;
    expect(scores.every(match => match.competition.toLowerCase().includes('superliga'))).toBe(true);
    expect(scores.length).toBeGreaterThan(0);
  });

  test('returns empty array when no matches found for competition filter', async () => {
    const out = await handler({ competition: 'NonExistentLeague' });
    expect(out.structuredContent.scores).toEqual([]);
    expect(out.content[0].text).toMatch(/no matches found/i);
  });

  test('returns all matches when no filters provided', async () => {
    const out = await handler({});
    expect(out.structuredContent.scores.length).toBe(4);
    expect(out.content[0].text).toMatch(/found 4 matches/i);
  });
});