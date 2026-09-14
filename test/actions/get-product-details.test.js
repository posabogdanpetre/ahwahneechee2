const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
    const validId = 'pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026';

    test('content is an array of text blocks', async () => {
        const out = await handler({ product_id: validId });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"full picture on the Asics Gel-Kayano 32" returns the product detail', async () => {
        const out = await handler({ product_id: validId });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent).toBeDefined();
        expect(out.structuredContent.name).toMatch(/Gel-Kayano 32/);
        expect(out.structuredContent.product_url).toMatch(/^https:\/\//);
    });

    test('structuredContent is a flat plain object, not a bare array', async () => {
        const out = await handler({ product_id: validId });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        // detail shape — fields flat, no wrapper key
        expect(out.structuredContent.product).toBeUndefined();
        expect(out.structuredContent.available_sizes).toEqual(
            expect.arrayContaining(['37', '40 1/2']),
        );
    });

    test('resolves a product by partial id match', async () => {
        const out = await handler({ product_id: 'garmin-forerunner-970' });
        expect(out.structuredContent.product_id).toBe('ceas-garmin-forerunner-970-amoled');
    });

    test('accepts an optional variant argument', async () => {
        const out = await handler({ product_id: validId, variant: '39' });
        expect(out.content[0].text).toMatch(/39/);
        expect(out.structuredContent.name).toMatch(/Gel-Kayano 32/);
    });

    test('returns error message when product_id is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/product_id|provide/i);
        expect(out.structuredContent).toEqual({});
    });

    test('unknown product id returns not-found with empty structuredContent', async () => {
        const out = await handler({ product_id: 'does-not-exist-xyz' });
        expect(out.content[0].text).toMatch(/no product found|not found/i);
        expect(out.structuredContent).toEqual({});
    });
});
