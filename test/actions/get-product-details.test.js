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

    test('returns error message when product_name is empty string', async () => {
        const out = await handler({ product_name: '   ' });
        expect(out.content[0].text).toMatch(/provide/i);
        expect(out.structuredContent.item).toBeNull();
    });

    test('"Tell me more about the Nano Puff Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Nano Puff' });
        expect(out.structuredContent.item).not.toBeNull();
        expect(out.structuredContent.item.name).toMatch(/Nano Puff/i);
        expect(out.structuredContent.item).toHaveProperty('description');
        expect(out.structuredContent.item).toHaveProperty('price');
        expect(out.structuredContent.item).toHaveProperty('category');
        expect(out.structuredContent.item).toHaveProperty('materials');
        expect(out.structuredContent.item).toHaveProperty('colors');
        expect(Array.isArray(out.structuredContent.item.colors)).toBe(true);
        expect(out.structuredContent.item).toHaveProperty('certifications');
    });

    test('returns null item when product is not found', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' });
        expect(out.content[0].text).toMatch(/No product found/i);
        expect(out.structuredContent.item).toBeNull();
    });

    test('case-insensitive product search', async () => {
        const out1 = await handler({ product_name: 'houdini' });
        const out2 = await handler({ product_name: 'HOUDINI' });
        const out3 = await handler({ product_name: 'Houdini' });

        expect(out1.structuredContent.item).not.toBeNull();
        expect(out2.structuredContent.item).not.toBeNull();
        expect(out3.structuredContent.item).not.toBeNull();
        expect(out1.structuredContent.item.name).toBe(out2.structuredContent.item.name);
        expect(out2.structuredContent.item.name).toBe(out3.structuredContent.item.name);
    });

    test('partial name match works', async () => {
        const out = await handler({ product_name: 'Better Sweater' });
        expect(out.structuredContent.item).not.toBeNull();
        expect(out.structuredContent.item.name).toMatch(/Better Sweater/i);
    });

    test('content text includes product details', async () => {
        const out = await handler({ product_name: 'Triolet' });
        expect(out.content[0].text).toMatch(/Triolet/i);
        expect(out.content[0].text).toMatch(/price/i);
        expect(out.content[0].text).toMatch(/color/i);
    });
});