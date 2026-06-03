const searchProducts = require('../../actions/search-products/index.js');

describe('search_products', () => {
  test('returns all products when no filters provided', async () => {
    const result = await searchProducts({});
    
    expect(result.content).toContain('Found');
    expect(result.content).toContain('product');
    expect(result.structuredContent).toHaveProperty('products');
    expect(Array.isArray(result.structuredContent.products)).toBe(true);
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
    
    // Verify product structure
    const product = result.structuredContent.products[0];
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('image_url');
    expect(product).toHaveProperty('url');
  });

  test('filters products by category', async () => {
    const result = await searchProducts({ category: 'Jackets & Vests' });
    
    expect(result.structuredContent.products.length).toBeGreaterThan(0);
    result.structuredContent.products.forEach(product => {
      expect(product.category).toBe('Jackets & Vests');
    });
  });

  test('filters products by gender', async () => {
    const result = await searchProducts({ gender: 'mens' });
    
    result.structuredContent.products.forEach(product => {
      expect(product.name.toLowerCase()).toContain("men's");
    });
  });

  test('returns empty array when no products match filters', async () => {
    const result = await searchProducts({ category: 'Wetsuits' });
    
    expect(result.content).toContain('No products found');
    expect(result.structuredContent.products).toEqual([]);
  });

  test('combines multiple filters', async () => {
    const result = await searchProducts({ 
      category: 'Jackets & Vests',
      gender: 'womens'
    });
    
    result.structuredContent.products.forEach(product => {
      expect(product.category).toBe('Jackets & Vests');
      expect(product.name.toLowerCase()).toContain("women's");
    });
  });
});
