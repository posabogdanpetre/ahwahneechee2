const handler = require('../../actions/get-current-deals/index.js');

describe('get_current_deals handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({});
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({});
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.deals contains all deals when no filters provided', async () => {
    const out = await handler({});
    expect(out.structuredContent.deals).toBeDefined();
    expect(Array.isArray(out.structuredContent.deals)).toBe(true);
    expect(out.structuredContent.deals.length).toBeGreaterThan(0);
  });

  test('filters by category', async () => {
    const out = await handler({ category: 'Fleece' });
    const deals = out.structuredContent.deals;
    expect(deals.length).toBeGreaterThan(0);
    expect(deals.every(d => d.category === 'Fleece')).toBe(true);
  });

  test('filters by gender (mens)', async () => {
    const out = await handler({ gender: 'mens' });
    const deals = out.structuredContent.deals;
    expect(deals.length).toBeGreaterThan(0);
    expect(deals.every(d => d.name.toLowerCase().includes("men's"))).toBe(true);
  });

  test('filters by gender (womens)', async () => {
    const out = await handler({ gender: 'womens' });
    const deals = out.structuredContent.deals;
    expect(deals.length).toBeGreaterThan(0);
    expect(deals.every(d => d.name.toLowerCase().includes("women's"))).toBe(true);
  });

  test('returns empty array when no matches found', async () => {
    const out = await handler({ category: 'NonExistentCategory' });
    expect(out.structuredContent.deals).toEqual([]);
    expect(out.content[0].text).toMatch(/no deals found/i);
  });

  test('combines category and gender filters', async () => {
    const out = await handler({ category: 'Jackets', gender: 'womens' });
    const deals = out.structuredContent.deals;
    if (deals.length > 0) {
      expect(deals.every(d => d.category === 'Jackets' && d.name.toLowerCase().includes("women's"))).toBe(true);
    }
  });
});