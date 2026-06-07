const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ category: 'Fleece' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ category: 'Fleece' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('"Show me some Patagonia jackets" returns jacket products', async () => {
    const out = await handler({ category: 'Jackets & Vests' })
    expect(out.structuredContent.products.length).toBeGreaterThan(0)
    expect(out.structuredContent.products.every(p => p.category === 'Jackets & Vests')).toBe(true)
  })

  test('filters by gender', async () => {
    const out = await handler({ gender: 'womens' })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.name.toLowerCase().includes('women'))).toBe(true)
  })

  test('filters by query string', async () => {
    const out = await handler({ query: 'sweater' })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.name.toLowerCase().includes('sweater'))).toBe(true)
  })

  test('returns empty results when no products match', async () => {
    const out = await handler({ query: 'nonexistent-product-xyz' })
    expect(out.structuredContent.products).toEqual([])
    expect(out.content[0].text).toMatch(/No products found/i)
  })

  test('combines multiple filters', async () => {
    const out = await handler({ category: 'Fleece', gender: 'womens' })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.category === 'Fleece' && p.name.toLowerCase().includes('women'))).toBe(true)
  })

  test('returns all products when no filters provided', async () => {
    const out = await handler({})
    expect(out.structuredContent.products.length).toBe(3)
    expect(out.content[0].text).toMatch(/Found 3 products/)
  })
})