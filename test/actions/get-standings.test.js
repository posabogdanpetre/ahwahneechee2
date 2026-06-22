const handler = require('../../actions/get-standings/index.js');

describe('get_standings handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ competition: 'Premier League' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ competition: 'Premier League' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.standings is an array of teams', async () => {
    const out = await handler({ competition: 'La Liga' });
    expect(Array.isArray(out.structuredContent.standings)).toBe(true);
    expect(out.structuredContent.standings.length).toBeGreaterThan(0);
    const firstTeam = out.structuredContent.standings[0];
    expect(firstTeam).toHaveProperty('position');
    expect(firstTeam).toHaveProperty('team');
    expect(firstTeam).toHaveProperty('points');
  });

  test('returns error message when required arg is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/competition|provide/i);
  });

  test('returns empty standings for unknown competition', async () => {
    const out = await handler({ competition: 'Unknown League' });
    expect(out.structuredContent.standings).toEqual([]);
    expect(out.content[0].text).toMatch(/no standings data/i);
  });

  test('returns standings for Liga 1', async () => {
    const out = await handler({ competition: 'Liga 1' });
    expect(out.structuredContent.standings.length).toBeGreaterThan(0);
    expect(out.content[0].text).toMatch(/Liga 1/i);
  });

  test('content includes top team name and points', async () => {
    const out = await handler({ competition: 'Premier League' });
    expect(out.content[0].text).toMatch(/Manchester City/i);
    expect(out.content[0].text).toMatch(/89 points/i);
  });
});
