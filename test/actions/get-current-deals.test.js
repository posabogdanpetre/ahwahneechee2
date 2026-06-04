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

  test('structuredContent.deals is an array', async () => {
    const out = await handler({});
    expect(Array.isArray(out.structuredContent.deals)).toBe(true);
    expect(out.structuredContent.deals.length).toBeGreaterThan(0);
  });

  test('"What past-season deals are available?" returns all deals', async () => {
    const out = await handler({});
    const deals = out.structuredContent.deals;
    expect(deals.length).toBe(5);
    expect(deals[0]).toHaveProperty('name');
    expect(deals[0]).toHaveProperty('original_price');
    expect(deals[0]).toHaveProperty('sale_price');
    expect(deals[0]).toHaveProperty('discount_percentage');
    expect(deals[0]).toHaveProperty('image_url');
    expect(deals[0]).toHaveProperty('category');
  });

  test('filters by category when provided', async () => {
    const out = await handler({ category: "Women's" });
    const deals = out.structuredContent.deals;
    expect(deals.length).toBe(1);
    expect(deals.every(d => d.category === "Women's")).toBe(true);
    expect(out.content[0].text).toMatch(/Women's/);
  });

  test('returns empty array for unknown category', async () => {
    const out = await handler({ category: 'Unknown Category' });
    const deals = out.structuredContent.deals;
    expect(deals.length).toBe(0);
    expect(out.content[0].text).toMatch(/No past-season deals found/i);
  });

  test('returns all deals when category is empty string', async () => {
    const out = await handler({ category: '' });
    const deals = out.structuredContent.deals;
    expect(deals.length).toBe(5);
  });

  test('content text includes discount percentage information', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/\d+%/);
  });
});
