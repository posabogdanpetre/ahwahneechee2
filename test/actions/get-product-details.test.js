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

  test('"Tell me more about the Nano Puff Insulated Jacket" returns product details', async () => {
    const out = await handler({ product_name: 'Nano Puff Insulated Jacket' });
    expect(out.structuredContent.product).toBeTruthy();
    expect(out.structuredContent.product.name).toMatch(/Nano Puff/i);
    expect(out.content[0].text).toMatch(/Nano Puff/i);
  });

  test('returns null product when no match is found', async () => {
    const out = await handler({ product_name: 'Nonexistent Product XYZ' });
    expect(out.structuredContent.product).toBeNull();
    expect(out.content[0].text).toMatch(/No product found/i);
  });

  test('performs case-insensitive partial matching', async () => {
    const out = await handler({ product_name: 'better sweater' });
    expect(out.structuredContent.product).toBeTruthy();
    expect(out.structuredContent.product.name).toBe("Women's Better Sweater Fleece Jacket");
  });

  test('trims whitespace from product_name', async () => {
    const out = await handler({ product_name: '  Black Hole Pack  ' });
    expect(out.structuredContent.product).toBeTruthy();
    expect(out.structuredContent.product.name).toBe('Black Hole Pack 32L');
  });
});
