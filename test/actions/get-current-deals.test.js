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

    test('structuredContent.items contains deal objects', async () => {
        const out = await handler({});
        expect(out.structuredContent).toHaveProperty('items');
        expect(Array.isArray(out.structuredContent.items)).toBe(true);
        expect(out.structuredContent.items.length).toBeGreaterThan(0);
        
        const firstDeal = out.structuredContent.items[0];
        expect(firstDeal).toHaveProperty('name');
        expect(firstDeal).toHaveProperty('original_price');
        expect(firstDeal).toHaveProperty('sale_price');
        expect(firstDeal).toHaveProperty('discount_percentage');
        expect(firstDeal).toHaveProperty('category');
        expect(firstDeal).toHaveProperty('image_url');
    });

    test('"What\'s on sale right now?" returns all deals', async () => {
        const out = await handler({});
        expect(out.structuredContent.items.length).toBe(4);
        expect(out.content[0].text).toMatch(/Found 4 deals/i);
    });

    test('filters deals by category', async () => {
        const out = await handler({ category: "Men's" });
        const items = out.structuredContent.items;
        
        expect(items.length).toBe(3);
        expect(items.every(item => item.category === "Men's")).toBe(true);
        expect(out.content[0].text).toMatch(/Found 3 deals in the Men's category/i);
    });

    test('returns empty results when category has no matches', async () => {
        const out = await handler({ category: "Women's" });
        expect(out.structuredContent.items.length).toBe(0);
        expect(out.content[0].text).toMatch(/No current deals found in the Women's category/i);
    });

    test('filters deals by Packs & Gear category', async () => {
        const out = await handler({ category: "Packs & Gear" });
        const items = out.structuredContent.items;
        
        expect(items.length).toBe(1);
        expect(items[0].category).toBe("Packs & Gear");
        expect(items[0].name).toBe("Black Hole Duffel Bag 55L");
    });

    test('content text includes prices and discounts', async () => {
        const out = await handler({});
        const text = out.content[0].text;
        
        expect(text).toMatch(/\$169/);
        expect(text).toMatch(/\$199/);
        expect(text).toMatch(/15%|16%|17%|14%/);
    });
});