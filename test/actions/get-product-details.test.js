const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Nano Puff' });
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Nano Puff' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('returns error message when required arg is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/product_name|provide/i);
    });

    test('"Tell me more about the Nano Puff Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Nano Puff Jacket' });
        expect(out.structuredContent).toHaveProperty('name');
        expect(out.structuredContent.name).toContain('Nano Puff');
        expect(out.structuredContent).toHaveProperty('price');
        expect(out.structuredContent).toHaveProperty('description');
        expect(out.structuredContent).toHaveProperty('image_url');
    });

    test('returns not found message when product does not exist', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' });
        expect(out.content[0].text).toMatch(/no product found|not found/i);
        expect(out.structuredContent).toBeUndefined();
    });

    test('partial product name match works', async () => {
        const out = await handler({ product_name: 'Down Sweater' });
        expect(out.structuredContent).toHaveProperty('name');
        expect(out.structuredContent.name).toContain('Down Sweater');
    });

    test('search is case insensitive', async () => {
        const out = await handler({ product_name: 'black hole' });
        expect(out.structuredContent).toHaveProperty('name');
        expect(out.structuredContent.name).toContain('Black Hole');
    });
});