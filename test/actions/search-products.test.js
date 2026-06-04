const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ category: 'Jackets' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({});
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.products is an array', async () => {
    const out = await handler({});
    expect(Array.isArray(out.structuredContent.products)).toBe(true);
  });

  test('"Show me some outdoor jackets" returns jacket products', async () => {
    const out = await handler({ category: 'Jackets' });
    const products = out.structuredContent.products;
    
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => p.category === 'Jackets')).toBe(true);
    expect(out.content[0].text).toMatch(/Found \d+ products/);
  });

  test('filters by gender: mens', async () => {
    const out = await handler({ gender: 'mens' });
    const products = out.structuredContent.products;
    
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => p.name.toLowerCase().includes('men\'s'))).toBe(true);
  });

  test('filters by gender: womens', async () => {
    const out = await handler({ gender: 'womens' });
    const products = out.structuredContent.products;
    
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => p.name.toLowerCase().includes('women\'s'))).toBe(true);
  });

  test('filters by category: Fleece', async () => {
    const out = await handler({ category: 'Fleece' });
    const products = out.structuredContent.products;
    
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => p.category === 'Fleece')).toBe(true);
  });

  test('returns empty array and appropriate message when no results match', async () => {
    const out = await handler({ category: 'NonExistentCategory' });
    
    expect(out.structuredContent.products).toEqual([]);
    expect(out.content[0].text).toMatch(/No products found/i);
  });

  test('combines multiple filters', async () => {
    const out = await handler({ category: 'Jackets', gender: 'womens' });
    const products = out.structuredContent.products;
    
    expect(products.length).toBeGreaterThan(0);
    expect(products.every(p => 
      p.category === 'Jackets' && p.name.toLowerCase().includes('women\'s')
    )).toBe(true);
  });

  test('returns all products when no filters provided', async () => {
    const out = await handler({});
    const products = out.structuredContent.products;
    
    expect(products.length).toBe(6);
    expect(out.content[0].text).toMatch(/Found 6 products/);
  });
});
