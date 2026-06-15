const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ query: 'jacket' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ query: 'fleece' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('"Show me some Patagonia products" returns product list', async () => {
    const out = await handler({})
    expect(out.structuredContent.products.length).toBeGreaterThan(0)
    expect(out.structuredContent.products[0]).toHaveProperty('name')
    expect(out.structuredContent.products[0]).toHaveProperty('price')
    expect(out.structuredContent.products[0]).toHaveProperty('image_url')
  })

  test('filters by category', async () => {
    const out = await handler({ category: 'Fleece' })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.category === 'Fleece')).toBe(true)
  })

  test('filters by gender', async () => {
    const out = await handler({ gender: "Men's" })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.gender === "Men's")).toBe(true)
  })

  test('filters by query text', async () => {
    const out = await handler({ query: 'Alpine' })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.some(p => p.name.toLowerCase().includes('alpine'))).toBe(true)
  })

  test('returns empty results when no matches found', async () => {
    const out = await handler({ query: 'xyz-nonexistent-product' })
    expect(out.structuredContent.products).toEqual([])
    expect(out.content[0].text).toMatch(/No products found/i)
  })

  test('combines multiple filters', async () => {
    const out = await handler({ category: 'Fleece', gender: "Women's" })
    const products = out.structuredContent.products
    expect(products.length).toBeGreaterThan(0)
    expect(products.every(p => p.category === 'Fleece' && p.gender === "Women's")).toBe(true)
  })
})
