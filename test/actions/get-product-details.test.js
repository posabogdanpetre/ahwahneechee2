const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ product_name: 'Nano Puff Jacket' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    expect(out.content[0].text.length).toBeGreaterThan(0);
  });

  test('structuredContent.product is a plain object, not an array', async () => {
    const out = await handler({ product_name: 'Better Sweater Quarter-Zip Fleece' });
    expect(out.structuredContent).toHaveProperty('product');
    expect(typeof out.structuredContent.product).toBe('object');
    expect(Array.isArray(out.structuredContent.product)).toBe(false);
  });

  test('returns product details with all expected fields', async () => {
    const out = await handler({ product_name: 'Nano Puff Jacket' });
    const product = out.structuredContent.product;

    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('fit');
    expect(product).toHaveProperty('weight');
    expect(product).toHaveProperty('materials');
    expect(product).toHaveProperty('rating');
    expect(product).toHaveProperty('review_count');
    expect(product).toHaveProperty('certifications');
    expect(product).toHaveProperty('image_url');

    expect(product.name).toBe('Nano Puff Jacket');
    expect(product.price).toBe('£210.00');
    expect(typeof product.rating).toBe('number');
    expect(typeof product.review_count).toBe('number');
  });

  test('returns error message when product_name is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/provide.*product_name/i);
    expect(out.structuredContent.product).toBeNull();
  });

  test('returns error message when product_name is empty string', async () => {
    const out = await handler({ product_name: '   ' });
    expect(out.content[0].text).toMatch(/provide.*product_name/i);
    expect(out.structuredContent.product).toBeNull();
  });

  test('returns null when product is not found', async () => {
    const out = await handler({ product_name: 'Non-Existent Product XYZ' });
    expect(out.content[0].text).toMatch(/no product found/i);
    expect(out.structuredContent.product).toBeNull();
  });

  test('case-insensitive product name matching', async () => {
    const out = await handler({ product_name: 'nano puff jacket' });
    expect(out.structuredContent.product).not.toBeNull();
    expect(out.structuredContent.product.name).toBe('Nano Puff Jacket');
  });

  test('content text includes product name and price', async () => {
    const out = await handler({ product_name: 'Capilene Cool Daily Hoody' });
    expect(out.content[0].text).toMatch(/Capilene Cool Daily Hoody/);
    expect(out.content[0].text).toMatch(/£55\.00/);
  });
});
