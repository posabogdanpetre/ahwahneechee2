const handler = require('../../actions/get-live-scores/index.js');

describe('get_live_scores handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ date: '2026-06-22' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ date: '2026-06-22' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.scores is an array', async () => {
    const out = await handler({ date: '2026-06-22' });
    expect(Array.isArray(out.structuredContent.scores)).toBe(true);
  });

  test('filters by competition when specified', async () => {
    const out = await handler({ date: '2026-06-22', competition: 'Premier League' });
    const scores = out.structuredContent.scores;
    expect(scores.length).toBeGreaterThan(0);
    expect(scores.every(s => s.competition.toLowerCase().includes('premier league'))).toBe(true);
  });

  test('returns empty array when competition has no matches', async () => {
    const out = await handler({ date: '2026-06-22', competition: 'NonExistent League' });
    const scores = out.structuredContent.scores;
    expect(Array.isArray(scores)).toBe(true);
    expect(scores.length).toBe(0);
    expect(out.content[0].text).toMatch(/no matches found/i);
  });

  test('defaults to today when no date provided', async () => {
    const out = await handler({});
    expect(out).toHaveProperty('content');
    expect(out.content[0].text).toMatch(/found \d+ match/i);
  });

  test('content summary includes match counts by status', async () => {
    const out = await handler({ date: '2026-06-22' });
    const text = out.content[0].text;
    expect(text).toMatch(/live|finished|scheduled/i);
  });

  test('returns all matches when no competition filter', async () => {
    const out = await handler({ date: '2026-06-22' });
    const scores = out.structuredContent.scores;
    expect(scores.length).toBe(5); // MOCK_DATA has 5 items
  });
});