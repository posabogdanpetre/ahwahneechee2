const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
    test('"Show me some Patagonia products" returns product list', async () => {
        const out = await handler({});
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
        expect(out.content[0].text).toMatch(/Found \d+ Patagonia product/);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({});
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('structuredContent.products contains product items', async () => {
        const out = await handler({});
        expect(out.structuredContent).toHaveProperty('products');
        expect(Array.isArray(out.structuredContent.products)).toBe(true);
        expect(out.structuredContent.products.length).toBeGreaterThan(0);
    });

    test('filters by category', async () => {
        const out = await handler({ category: 'Fleece' });
        const products = out.structuredContent.products;
        expect(products.every(p => p.category && p.category.includes('Fleece'))).toBe(true);
        expect(out.content[0].text).toMatch(/Fleece/);
    });

    test('filters by gender', async () => {
        const out = await handler({ gender: "Women's" });
        const products = out.structuredContent.products;
        expect(products.every(p => p.category && p.category.includes("Women's"))).toBe(true);
        expect(out.content[0].text).toMatch(/Women's/);
    });

    test('returns empty result when no products match filters', async () => {
        const out = await handler({ category: 'Nonexistent Category' });
        expect(out.structuredContent.products).toEqual([]);
        expect(out.content[0].text).toMatch(/No products found/i);
    });

    test('returns all products when no filters are applied', async () => {
        const out = await handler({});
        expect(out.structuredContent.products.length).toBe(5);
    });
});
