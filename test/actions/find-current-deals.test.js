const handler = require('../../actions/find-current-deals/index.js');

describe('find_current_deals handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({});
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"round up the best current running discounts" returns current deals', async () => {
        const out = await handler({ sport: 'Alergare' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.deals.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object with a deals array, not a bare array', async () => {
        const out = await handler({});
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(Array.isArray(out.structuredContent.deals)).toBe(true);
    });

    test('only genuine promotions are returned (every deal has a positive discount)', async () => {
        const out = await handler({});
        expect(out.structuredContent.deals.length).toBeGreaterThan(0);
        expect(out.structuredContent.deals.every((d) => d.discount_percent > 0)).toBe(true);
    });

    test('filters by category', async () => {
        const out = await handler({ category: 'Pantofi alergare' });
        const { deals } = out.structuredContent;
        expect(deals.length).toBeGreaterThan(0);
        expect(deals.every((d) => d.category === 'Pantofi alergare')).toBe(true);
    });

    test('filters by brand', async () => {
        const out = await handler({ brand: 'Puma' });
        const { deals } = out.structuredContent;
        expect(deals.length).toBeGreaterThan(0);
        expect(deals.every((d) => d.brand === 'Puma')).toBe(true);
    });

    test('respects minimum_discount_percent', async () => {
        const out = await handler({ minimum_discount_percent: 20 });
        expect(out.structuredContent.deals.every((d) => d.discount_percent >= 20)).toBe(true);
    });

    test('respects budget_max_ron', async () => {
        const out = await handler({ budget_max_ron: 2000 });
        expect(out.structuredContent.deals.every((d) => d.current_price <= 2000)).toBe(true);
    });

    test('sorts by largest discount by default', async () => {
        const out = await handler({});
        const discounts = out.structuredContent.deals.map((d) => d.discount_percent);
        const sorted = [...discounts].sort((a, b) => b - a);
        expect(discounts).toEqual(sorted);
    });

    test('returns an empty deals array (still a plain object) when nothing matches', async () => {
        const out = await handler({ brand: 'NoSuchBrand' });
        expect(out.structuredContent.deals).toEqual([]);
        expect(out.content[0].text).toMatch(/no current deals/i);
    });
});
