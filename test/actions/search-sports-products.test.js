const handler = require('../../actions/search-sports-products/index.js');

describe('search_sports_products handler', () => {
    it('returns matching products for a valid query', async () => {
        const res = await handler({ query: 'running shoes' });
        expect(res.content).toEqual([
            expect.objectContaining({ type: 'text', text: expect.any(String) }),
        ]);
        expect(res.structuredContent).toEqual(
            expect.objectContaining({ products: expect.any(Array) }),
        );
        expect(Array.isArray(res.structuredContent.products)).toBe(true);
        expect(res.structuredContent.products.length).toBeGreaterThan(0);
    });

    it('structuredContent is a plain object, not a bare array', async () => {
        const res = await handler({ query: 'Garmin' });
        expect(Array.isArray(res.structuredContent)).toBe(false);
        expect(typeof res.structuredContent).toBe('object');
        expect(res.structuredContent).not.toBeNull();
    });

    it('returns an empty products array when query is missing', async () => {
        const res = await handler({});
        expect(res.content[0].text).toMatch(/provide a query/i);
        expect(res.structuredContent).toEqual({ products: [] });
    });

    it('filters by brand', async () => {
        const res = await handler({ query: 'alergare', brand: 'Asics' });
        expect(res.structuredContent.products.length).toBeGreaterThan(0);
        res.structuredContent.products.forEach((p) => {
            expect(p.brand).toBe('Asics');
        });
    });

    it('filters by gender', async () => {
        const res = await handler({ query: 'alergare', gender: 'Femei' });
        expect(res.structuredContent.products.length).toBeGreaterThan(0);
        res.structuredContent.products.forEach((p) => {
            expect(p.gender).toBe('Femei');
        });
    });

    it('respects budget_max_ron', async () => {
        const res = await handler({ query: 'alergare', budget_max_ron: 900 });
        expect(res.structuredContent.products.length).toBeGreaterThan(0);
        res.structuredContent.products.forEach((p) => {
            const num = parseFloat(p.price.replace(/\./g, '').replace(/,/g, '.').match(/(\d+(?:\.\d+)?)/)[1]);
            expect(num).toBeLessThanOrEqual(900);
        });
    });

    it('sorts by lowest price', async () => {
        const res = await handler({ query: 'alergare', sort_by: 'lowest price' });
        const prices = res.structuredContent.products.map(
            (p) => parseFloat(p.price.replace(/\./g, '').replace(/,/g, '.').match(/(\d+(?:\.\d+)?)/)[1]),
        );
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    it('returns empty array (not an error) when nothing matches', async () => {
        const res = await handler({ query: 'kayaking gear', sport: 'Kayaking' });
        expect(res.structuredContent).toEqual({ products: [] });
        expect(res.content[0].text).toMatch(/no products found/i);
    });
});
