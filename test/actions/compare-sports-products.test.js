const handler = require('../../actions/compare-sports-products/index.js');

const ASICS = 'pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026';
const ON = 'pantofi-alergare-dama-on-cloudmonster-3-ss-2026';

describe('compare_sports_products handler', () => {
  test('content is an array of text blocks', async () => {
    const out = await handler({ product_ids: [ASICS, ON] });
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('"Asics Gel-Kayano 32 vs ON Cloudmonster 3" returns two products', async () => {
    const out = await handler({ product_ids: [ASICS, ON], priorities: ['comfort', 'price'] });
    expect(out.content[0].text.length).toBeGreaterThan(0);
    expect(out.structuredContent.products).toHaveLength(2);
    expect(out.structuredContent.products.map((p) => p.product_id)).toEqual([ASICS, ON]);
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ product_ids: [ASICS, ON] });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('returns error message when product_ids is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/two product_ids|provide/i);
    expect(out.structuredContent.products).toEqual([]);
  });

  test('rejects when not exactly two product_ids given', async () => {
    const out = await handler({ product_ids: [ASICS] });
    expect(out.content[0].text).toMatch(/exactly two/i);
    expect(out.structuredContent.products).toEqual([]);
  });

  test('returns empty products when an id does not match the catalog', async () => {
    const out = await handler({ product_ids: [ASICS, 'nonexistent-product-id'] });
    expect(out.content[0].text).toMatch(/could not find|try again/i);
    expect(out.structuredContent.products).toEqual([]);
  });
});
