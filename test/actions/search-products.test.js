const handler = require('../../actions/search-products/index.js');

describe('search_products', () => {
  it('returns all products when no filters are provided', async () => {
    const result = await handler({});

    expect(result.content).toContain('Found 4 products');
    expect(result.structuredContent).toBeDefined();
    expect(result.structuredContent.products).toHaveLength(4);
    expect(result.structuredContent.products[0]).toHaveProperty('name');
    expect(result.structuredContent.products[0]).toHaveProperty('price');
    expect(result.structuredContent.products[0]).toHaveProperty('category');
    expect(result.structuredContent.products[0]).toHaveProperty('image_url');
    expect(result.structuredContent.products[0]).toHaveProperty('product_url');
  });

  it('filters products by category', async () => {
    const result = await handler({ category: 'Fleece' });

    expect(result.structuredContent.products).toHaveLength(3);
    expect(result.structuredContent.products.every(p => p.category === 'Fleece')).toBe(true);
    expect(result.content).toContain('Found 3 products');
  });

  it('filters products by query', async () => {
    const result = await handler({ query: 'Micro D' });

    expect(result.structuredContent.products).toHaveLength(1);
    expect(result.structuredContent.products[0].name).toBe("Men's Micro D Fleece Jacket");
    expect(result.content).toContain('Found 1 product');
  });

  it('returns empty results when no products match', async () => {
    const result = await handler({ query: 'nonexistent product' });

    expect(result.structuredContent.products).toHaveLength(0);
    expect(result.content).toContain('No products found');
  });

  it('filters by both query and category', async () => {
    const result = await handler({ query: 'jacket', category: 'Fleece' });

    expect(result.structuredContent.products).toHaveLength(3);
    expect(result.structuredContent.products.every(p => p.category === 'Fleece')).toBe(true);
  });

  it('returns structuredContent as a plain object, not an array', async () => {
    const result = await handler({});

    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(typeof result.structuredContent).toBe('object');
    expect(Array.isArray(result.structuredContent.products)).toBe(true);
  });

  it('performs case-insensitive category filtering', async () => {
    const result = await handler({ category: 'bags' });

    expect(result.structuredContent.products).toHaveLength(1);
    expect(result.structuredContent.products[0].category).toBe('Bags');
  });
});
