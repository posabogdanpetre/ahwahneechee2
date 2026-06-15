const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({})
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({})
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.products is an array', async () => {
    const out = await handler({})
    expect(Array.isArray(out.structuredContent.products)).toBe(true)
  })

  test('"Show me some outdoor jackets" returns product results', async () => {
    const out = await handler({})
    expect(out.structuredContent.products.length).toBeGreaterThan(0)
    expect(out.content[0].text).toMatch(/Found \d+ product/)
  })

  test('filters by category when provided', async () => {
    const out = await handler({ category: 'Backpacks' })
    const products = out.structuredContent.products
    expect(products.length).toBe(1)
    expect(products[0].category).toBe('Backpacks')
    expect(out.content[0].text).toMatch(/category "Backpacks"/)
  })

  test('returns empty array when no products match category filter', async () => {
    const out = await handler({ category: 'Wetsuits' })
    const products = out.structuredContent.products
    expect(products.length).toBe(0)
    expect(out.content[0].text).toMatch(/No products found/)
  })

  test('returns all products when no filters are provided', async () => {
    const out = await handler({})
    expect(out.structuredContent.products.length).toBe(3)
  })

  test('product items contain expected fields', async () => {
    const out = await handler({})
    const product = out.structuredContent.products[0]
    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('price')
    expect(product).toHaveProperty('category')
    expect(product).toHaveProperty('image_url')
  })
})
