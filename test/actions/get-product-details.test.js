const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ product_name: 'Men\'s Better Sweater Fleece Jacket' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    expect(out.content[0].text.length).toBeGreaterThan(0)
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ product_name: 'Nano Puff' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.item contains expected product fields', async () => {
    const out = await handler({ product_name: 'Men\'s Better Sweater Fleece Jacket' })
    const item = out.structuredContent.item
    expect(item).toHaveProperty('name')
    expect(item).toHaveProperty('price')
    expect(item).toHaveProperty('description')
    expect(item).toHaveProperty('materials')
    expect(item).toHaveProperty('rating')
    expect(item).toHaveProperty('colors')
    expect(item).toHaveProperty('sizes')
    expect(item).toHaveProperty('fair_trade')
    expect(item).toHaveProperty('recycled_materials')
  })

  test('returns error message when product_name is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent.item).toBeNull()
  })

  test('returns error message when product_name is empty string', async () => {
    const out = await handler({ product_name: '   ' })
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent.item).toBeNull()
  })

  test('finds product with exact name match (case-insensitive)', async () => {
    const out = await handler({ product_name: 'BAGGIES SHORTS - 5"' })
    expect(out.structuredContent.item).not.toBeNull()
    expect(out.structuredContent.item.name).toContain('Baggies Shorts')
  })

  test('finds product with partial name match', async () => {
    const out = await handler({ product_name: 'Nano Puff' })
    expect(out.structuredContent.item).not.toBeNull()
    expect(out.structuredContent.item.name).toContain('Nano Puff')
  })

  test('returns null item when product not found', async () => {
    const out = await handler({ product_name: 'Nonexistent Product XYZ' })
    expect(out.structuredContent.item).toBeNull()
    expect(out.content[0].text).toMatch(/no product found/i)
  })

  test('content text includes price and rating for found product', async () => {
    const out = await handler({ product_name: 'Better Sweater' })
    const text = out.content[0].text
    expect(text).toMatch(/price/i)
    expect(text).toMatch(/rating/i)
    expect(text).toMatch(/\$\d+/)
  })

  test('accepts optional style_number parameter', async () => {
    const out = await handler({ product_name: 'Better Sweater', style_number: '25528' })
    expect(out).toHaveProperty('content')
    expect(out).toHaveProperty('structuredContent')
  })
})