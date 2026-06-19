const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details', () => {
  it('should return product details for a valid product name', async () => {
    const result = await handler({ product_name: 'Better Sweater Fleece Jacket' });

    expect(result.content).toBeDefined();
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain("Women's Better Sweater Fleece Jacket");
    expect(result.content[0].text).toContain('100% recycled polyester fleece');
    expect(result.content[0].text).toContain('Fair Trade Certified');

    expect(result.structuredContent).toBeDefined();
    expect(typeof result.structuredContent).toBe('object');
    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(result.structuredContent.name).toBe("Women's Better Sweater Fleece Jacket");
    expect(result.structuredContent.price).toBe(139);
    expect(result.structuredContent.category).toBe("Women's Fleece");
    expect(result.structuredContent.material).toBe('100% recycled polyester fleece');
    expect(Array.isArray(result.structuredContent.features)).toBe(true);
    expect(result.structuredContent.features.length).toBeGreaterThan(0);
    expect(result.structuredContent.certifications).toBeTruthy();
  });

  it('should return error when product_name is missing', async () => {
    const result = await handler({});

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('product_name is required');
  });

  it('should return error when product_name is empty string', async () => {
    const result = await handler({ product_name: '   ' });

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('product_name is required');
  });

  it('should return error when product is not found', async () => {
    const result = await handler({ product_name: 'Nonexistent Product XYZ123' });

    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('No product found matching');
    expect(result.content[0].text).toContain('Nonexistent Product XYZ123');
  });

  it('should perform case-insensitive search', async () => {
    const result = await handler({ product_name: 'houdini windbreaker' });

    expect(result.isError).toBeUndefined();
    expect(result.structuredContent.name).toBe("Men's Houdini Windbreaker Jacket");
    expect(result.content[0].text).toContain("Men's Houdini Windbreaker Jacket");
  });

  it('should find product with partial name match', async () => {
    const result = await handler({ product_name: 'Retro Pile' });

    expect(result.isError).toBeUndefined();
    expect(result.structuredContent.name).toBe("Women's Retro Pile Fleece Jacket");
    expect(result.structuredContent.material).toBe('100% recycled polyester deep-pile fleece');
  });
});
