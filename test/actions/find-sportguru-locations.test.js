const handler = require('../../actions/find-sportguru-locations/index.js');

describe('find_sportguru_locations handler', () => {
  test('returns a concise content summary and structuredContent for a matching location', async () => {
    const result = await handler({ location: 'Cluj-Napoca' });

    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content[0].type).toBe('text');
    expect(typeof result.content[0].text).toBe('string');
    expect(result.content[0].text).toMatch(/SportGuru/i);

    expect(result.structuredContent).toBeDefined();
    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(typeof result.structuredContent).toBe('object');
    expect(Array.isArray(result.structuredContent.locations)).toBe(true);
    expect(result.structuredContent.locations.length).toBeGreaterThan(0);

    const cluj = result.structuredContent.locations[0];
    expect(cluj.name).toMatch(/Cluj/i);
    expect(typeof cluj.latitude).toBe('number');
    expect(typeof cluj.longitude).toBe('number');
  });

  test('returns an empty locations array and a prompt when location is missing', async () => {
    const result = await handler({});

    expect(Array.isArray(result.content)).toBe(true);
    expect(result.content[0].text).toMatch(/location|provide/i);
    expect(result.structuredContent).toBeDefined();
    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(result.structuredContent.locations).toEqual([]);
  });

  test('falls back to the full store list when the query matches nothing', async () => {
    const result = await handler({ location: 'Nowhere-Ville-1234' });

    expect(result.structuredContent.locations.length).toBeGreaterThan(1);
    result.structuredContent.locations.forEach((store) => {
      expect(typeof store.name).toBe('string');
      expect(typeof store.latitude).toBe('number');
      expect(typeof store.longitude).toBe('number');
    });
  });

  test('preserves coordinates on every returned store for the map surface', async () => {
    const result = await handler({ location: 'Iasi' });

    result.structuredContent.locations.forEach((store) => {
      expect(Number.isFinite(store.latitude)).toBe(true);
      expect(Number.isFinite(store.longitude)).toBe(true);
    });
  });
});
