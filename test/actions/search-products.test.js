const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
    test('"Show me some Patagonia products" returns product list', async () => {
        const out = await handler({});
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
        expect(out.structuredContent.products.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({});
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('filters by category', async () => {
        const out = await handler({ category: "Men's Fleece" });
        const products = out.structuredContent.products;
        expect(products.every(p => p.category === "Men's Fleece")).toBe(true);
        expect(products.length).toBe(2);
    });

    test('filters by query string', async () => {
        const out = await handler({ query: 'Jacket' });
        const products = out.structuredContent.products;
        expect(products.every(p => p.name.toLowerCase().includes('jacket'))).toBe(true);
        expect(products.length).toBeGreaterThan(0);
    });

    test('returns empty results when no products match', async () => {
        const out = await handler({ query: 'nonexistent-product-xyz' });
        expect(out.structuredContent.products.length).toBe(0);
        expect(out.content[0].text).toMatch(/No products found/i);
    });

    test('filters by both category and query', async () => {
        const out = await handler({ category: "Men's Fleece", query: 'Retro' });
        const products = out.structuredContent.products;
        expect(products.length).toBe(1);
        expect(products[0].name).toBe("Men's Classic Retro-X Fleece Jacket");
    });
});