const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ category: 'Fleece' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({})
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('filters by category', async () => {
    const out = await handler({ category: 'Fleece' })
    const products = out.structuredContent.products
    expect(products.every(p => p.category === 'Fleece')).toBe(true)
    expect(out.content[0].text).toMatch(/Fleece/i)
  })

  test('filters by gender', async () => {
    const out = await handler({ gender: "Women's" })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.name.toLowerCase().includes("women"))).toBe(true)
  })

  test('filters by query', async () => {
    const out = await handler({ query: 'jacket' })
    const products = out.structuredContent.products
    expect(products.every(p => p.name.toLowerCase().includes('jacket'))).toBe(true)
  })

  test('returns empty array when no products match', async () => {
    const out = await handler({ query: 'nonexistent-product-xyz' })
    expect(out.structuredContent.products).toEqual([])
    expect(out.content[0].text).toMatch(/No products found/i)
  })

  test('returns all products when no filters applied', async () => {
    const out = await handler({})
    const products = out.structuredContent.products
    expect(products.length).toBe(3)
    expect(out.content[0].text).toMatch(/Found 3 products/i)
  })
})
