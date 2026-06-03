const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details', () => {
  it('should return product details when found', async () => {
    const result = await handler({ product_name: 'Down Sweater' });

    expect(result.isError).toBeUndefined();
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain("Men's Down Sweater™ Insulated Jacket");
    expect(result.content[0].text).toContain('£230');

    expect(result.structuredContent).toBeDefined();
    expect(typeof result.structuredContent).toBe('object');
    expect(Array.isArray(result.structuredContent)).toBe(false);
    expect(result.structuredContent.name).toBe("Men's Down Sweater™ Insulated Jacket");
    expect(result.structuredContent.price).toBe(230);
    expect(result.structuredContent.category).toBe('Jackets & Vests');
    expect(result.structuredContent.image_url).toContain('84675_CLOR.jpg');
  });

  it('should return error when product_name is missing', async () => {
    const result = await handler({});

    expect(result.isError).toBe(true);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].text).toContain('product_name is required');
  });

  it('should return error when product is not found', async () => {
    const result = await handler({ product_name: 'NonExistent Product XYZ' });

    expect(result.isError).toBe(true);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].text).toContain('No product found');
    expect(result.content[0].text).toContain('NonExistent Product XYZ');
  });

  it('should perform case-insensitive search', async () => {
    const result = await handler({ product_name: 'better sweater' });

    expect(result.isError).toBeUndefined();
    expect(result.structuredContent.name).toBe("Men's Better Sweater™ Fleece Jacket");
    expect(result.structuredContent.price).toBe(130);
  });

  it('should include all required outputSchema fields', async () => {
    const result = await handler({ product_name: 'Nano Puff' });

    expect(result.structuredContent).toHaveProperty('name');
    expect(result.structuredContent).toHaveProperty('description');
    expect(result.structuredContent).toHaveProperty('price');
    expect(result.structuredContent).toHaveProperty('category');
    expect(result.structuredContent).toHaveProperty('materials');
    expect(result.structuredContent).toHaveProperty('features');
    expect(result.structuredContent).toHaveProperty('available_colors');
    expect(result.structuredContent).toHaveProperty('available_sizes');
    expect(result.structuredContent).toHaveProperty('image_url');
  });
});
