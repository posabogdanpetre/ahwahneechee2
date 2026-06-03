const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ query: 'jacket' });
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ query: 'jacket' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('structuredContent.items is an array', async () => {
        const out = await handler({ query: 'jacket' });
        expect(Array.isArray(out.structuredContent.items)).toBe(true);
    });

    test('"Show me some jackets" returns jacket products', async () => {
        const out = await handler({ query: 'jacket' });
        expect(out.structuredContent.items.length).toBeGreaterThan(0);
        expect(out.content[0].text).toMatch(/Found \d+ product/);
    });

    test('filters by category', async () => {
        const out = await handler({ category: 'Insulated Jackets' });
        const items = out.structuredContent.items;
        expect(items.every(p => p.category === 'Insulated Jackets')).toBe(true);
    });

    test('filters by gender prefix in product name', async () => {
        const out = await handler({ gender: 'womens' });
        const items = out.structuredContent.items;
        expect(items.every(p => p.name.toLowerCase().startsWith("women's"))).toBe(true);
    });

    test('returns empty results with appropriate message when no matches', async () => {
        const out = await handler({ query: 'nonexistent' });
        expect(out.structuredContent.items.length).toBe(0);
        expect(out.content[0].text).toMatch(/No products found/i);
    });

    test('all returned items have numeric price field', async () => {
        const out = await handler({});
        const items = out.structuredContent.items;
        expect(items.every(p => typeof p.price === 'number')).toBe(true);
    });

    test('combines multiple filters', async () => {
        const out = await handler({ query: 'jacket', gender: 'mens' });
        const items = out.structuredContent.items;
        expect(items.length).toBeGreaterThan(0);
        expect(items.every(p => p.name.toLowerCase().includes('jacket') || p.name.toLowerCase().startsWith("men's"))).toBe(true);
    });

    test('returns all products when no filters provided', async () => {
        const out = await handler({});
        expect(out.structuredContent.items.length).toBe(5);
    });
});