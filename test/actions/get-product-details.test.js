const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ product_name: 'Better Sweater Fleece Jacket' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    expect(out.content[0].text).toMatch(/Better Sweater Fleece Jacket/)
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ product_name: 'Nano Puff Jacket' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.product contains expected fields', async () => {
    const out = await handler({ product_name: 'Torrentshell 3L Rain Jacket' })
    const product = out.structuredContent.product
    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('description')
    expect(product).toHaveProperty('price')
    expect(product).toHaveProperty('category')
    expect(product).toHaveProperty('materials')
    expect(product).toHaveProperty('features')
    expect(product).toHaveProperty('fit')
    expect(product).toHaveProperty('image_url')
  })

  test('returns error message when product_name is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent.product).toBeNull()
  })

  test('returns error message when product_name is empty string', async () => {
    const out = await handler({ product_name: '   ' })
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent.product).toBeNull()
  })

  test('"Tell me more about the Better Sweater Fleece Jacket" returns product details', async () => {
    const out = await handler({ product_name: 'Better Sweater Fleece Jacket' })
    expect(out.structuredContent.product).not.toBeNull()
    expect(out.structuredContent.product.name).toBe('Better Sweater Fleece Jacket')
    expect(out.structuredContent.product.price).toBe('$139.00')
    expect(out.content[0].text).toMatch(/Better Sweater Fleece Jacket/)
  })

  test('returns null product when product_name does not match any product', async () => {
    const out = await handler({ product_name: 'Nonexistent Product Name' })
    expect(out.content[0].text).toMatch(/No product found/i)
    expect(out.structuredContent.product).toBeNull()
  })

  test('product lookup is case-insensitive', async () => {
    const out = await handler({ product_name: 'nano puff jacket' })
    expect(out.structuredContent.product).not.toBeNull()
    expect(out.structuredContent.product.name).toBe('Nano Puff Jacket')
  })
})
