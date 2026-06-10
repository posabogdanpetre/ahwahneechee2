const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Better Sweater' });
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('structuredContent.product is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Nano Puff' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(out.structuredContent.product).toBeDefined();
        expect(typeof out.structuredContent.product).toBe('object');
    });

    test('returns error message when product_name is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/product_name|provide/i);
        expect(out.structuredContent.product).toBe(null);
    });

    test('returns error message when product_name is empty string', async () => {
        const out = await handler({ product_name: '   ' });
        expect(out.content[0].text).toMatch(/product_name|provide/i);
        expect(out.structuredContent.product).toBe(null);
    });

    test('"Tell me more about the Better Sweater Fleece Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Better Sweater Fleece Jacket' });
        expect(out.structuredContent.product).not.toBe(null);
        expect(out.structuredContent.product.name).toContain('Better Sweater');
        expect(out.structuredContent.product).toHaveProperty('price');
        expect(out.structuredContent.product).toHaveProperty('description');
        expect(out.structuredContent.product).toHaveProperty('materials');
        expect(out.structuredContent.product).toHaveProperty('colors');
        expect(Array.isArray(out.structuredContent.product.colors)).toBe(true);
        expect(out.structuredContent.product).toHaveProperty('rating');
        expect(out.structuredContent.product).toHaveProperty('review_count');
    });

    test('partial product name match works (case-insensitive)', async () => {
        const out = await handler({ product_name: 'nano puff' });
        expect(out.structuredContent.product).not.toBe(null);
        expect(out.structuredContent.product.name).toContain('Nano Puff');
    });

    test('returns null product and no-results message for unknown product', async () => {
        const out = await handler({ product_name: 'Unknown Product XYZ' });
        expect(out.content[0].text).toMatch(/No product found|Unknown Product XYZ/i);
        expect(out.structuredContent.product).toBe(null);
    });

    test('content text includes product name, price, and rating', async () => {
        const out = await handler({ product_name: 'Black Hole Duffel' });
        expect(out.content[0].text).toMatch(/Black Hole/i);
        expect(out.content[0].text).toMatch(/£160/);
        expect(out.content[0].text).toMatch(/4\.8/);
    });

    test('all expected output fields are present in structuredContent', async () => {
        const out = await handler({ product_name: 'Baggies Shorts' });
        const product = out.structuredContent.product;
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('materials');
        expect(product).toHaveProperty('weight');
        expect(product).toHaveProperty('colors');
        expect(product).toHaveProperty('rating');
        expect(product).toHaveProperty('review_count');
        expect(product).toHaveProperty('features');
        expect(product).toHaveProperty('care_instructions');
        expect(product).toHaveProperty('image_url');
    });
});
