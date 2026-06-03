// test/actions/search-products.test.js

const searchProducts = require('../../actions/search-products/index.js');

describe('search_products', () => {
  it('returns all products when no filters provided', async () => {
    const result = await searchProducts({});

    expect(result.content).toContain('Found 3 products');
    expect(result.structuredContent).toEqual(expect.objectContaining({
      products: expect.any(Array),
      total: 3
    }));
    expect(result.structuredContent.products).toHaveLength(3);
  });

  it('filters products by query string', async () => {
    const result = await searchProducts({ query: 'fleece' });

    expect(result.structuredContent.products).toHaveLength(1);
    expect(result.structuredContent.products[0].name).toContain('Fleece');
    expect(result.content).toContain("Women's Better Sweater Fleece Jacket");
  });

  it('filters products by category', async () => {
    const result = await searchProducts({ category: 'Jackets & Vests' });

    expect(result.structuredContent.products).toHaveLength(1);
    expect(result.structuredContent.products[0].category).toBe('Jackets & Vests');
  });

  it('filters products by gender', async () => {
    const result = await searchProducts({ gender: 'mens' });

    expect(result.structuredContent.products).toHaveLength(2);
    expect(result.structuredContent.products[0].name).toContain("Men's");
    expect(result.structuredContent.products[1].name).toContain("Men's");
  });

  it('combines multiple filters', async () => {
    const result = await searchProducts({
      query: 'jacket',
      gender: 'womens'
    });

    expect(result.structuredContent.products).toHaveLength(1);
    expect(result.structuredContent.products[0].name).toContain("Women's");
    expect(result.structuredContent.products[0].name.toLowerCase()).toContain('jacket');
  });

  it('returns empty results when no matches found', async () => {
    const result = await searchProducts({ query: 'nonexistent' });

    expect(result.structuredContent.products).toHaveLength(0);
    expect(result.structuredContent.total).toBe(0);
    expect(result.content).toContain('No products found');
  });

  it('returns structuredContent as object, not array', async () => {
    const result = await searchProducts({});

    expect(result.structuredContent).toEqual(expect.any(Object));
    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(Array.isArray(result.structuredContent.products)).toBe(true);
  });
});
