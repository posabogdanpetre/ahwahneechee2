const handler = require('../../actions/build-activity-gear-kit/index.js');

describe('build_activity_gear_kit handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ sport: 'running', experience_level: 'beginner', budget_max_ron: 1500 });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"complete road running kit around 1500 lei" returns products', async () => {
        const out = await handler({ sport: 'running', experience_level: 'beginner', budget_max_ron: 1500 });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.products.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ sport: 'running', experience_level: 'beginner', budget_max_ron: 1500 });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(Array.isArray(out.structuredContent.products)).toBe(true);
    });

    test('returns error message when required sport is missing', async () => {
        const out = await handler({ experience_level: 'beginner', budget_max_ron: 1500 });
        expect(out.content[0].text).toMatch(/sport|provide/i);
        expect(out.structuredContent.products).toEqual([]);
    });

    test('returns error message when budget_max_ron is missing or invalid', async () => {
        const out = await handler({ sport: 'running', experience_level: 'beginner' });
        expect(out.content[0].text).toMatch(/budget_max_ron|budget|provide/i);
        expect(out.structuredContent.products).toEqual([]);
    });

    test('excludes items priced above the budget', async () => {
        const out = await handler({ sport: 'running', experience_level: 'beginner', budget_max_ron: 1000 });
        const parse = (p) => parseFloat(String(p).replace(/\s/g, '').match(/([\d.]+,\d{2}|[\d.]+)/)[1].replace(/\./g, '').replace(',', '.'));
        expect(out.structuredContent.products.every((p) => parse(p.price) <= 1000)).toBe(true);
    });

    test('sport with no affordable matches returns an empty product list', async () => {
        const out = await handler({ sport: 'swimming', experience_level: 'beginner', budget_max_ron: 1500 });
        expect(out.structuredContent.products).toEqual([]);
        expect(out.content[0].text).toMatch(/no sportguru items|try/i);
    });

    test('respects owned_items by excluding matching gear', async () => {
        const out = await handler({
            sport: 'running',
            experience_level: 'beginner',
            budget_max_ron: 1500,
            owned_items: ['Pantofi alergare'],
        });
        expect(out.structuredContent.products.every((p) => !String(p.category).toLowerCase().includes('pantofi'))).toBe(true);
    });
});
