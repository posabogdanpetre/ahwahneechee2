const handler = require('../../actions/get-current-deals/index.js')

describe('get_current_deals handler', () => {
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

  test('structuredContent.deals is an array of deal items', async () => {
    const out = await handler({})
    expect(Array.isArray(out.structuredContent.deals)).toBe(true)
    expect(out.structuredContent.deals.length).toBeGreaterThan(0)
  })

  test('"What deals are available right now?" returns all deals when no filters are provided', async () => {
    const out = await handler({})
    const deals = out.structuredContent.deals
    expect(deals.length).toBe(3)
    expect(deals[0]).toHaveProperty('name')
    expect(deals[0]).toHaveProperty('original_price')
    expect(deals[0]).toHaveProperty('sale_price')
    expect(deals[0]).toHaveProperty('discount_percentage')
    expect(deals[0]).toHaveProperty('category')
    expect(deals[0]).toHaveProperty('image_url')
  })

  test('filters deals by category', async () => {
    const out = await handler({ category: 'Fleece' })
    const deals = out.structuredContent.deals
    expect(deals.length).toBe(1)
    expect(deals.every(d => d.category === 'Fleece')).toBe(true)
    expect(out.content[0].text).toMatch(/1 deal in Fleece/)
  })

  test('returns empty array when category filter matches no items', async () => {
    const out = await handler({ category: 'Baselayers' })
    const deals = out.structuredContent.deals
    expect(deals.length).toBe(0)
    expect(out.content[0].text).toMatch(/0 deals/)
  })

  test('content text describes result count accurately', async () => {
    const out = await handler({ category: 'Jackets & Vests' })
    expect(out.content[0].text).toMatch(/1 deal in Jackets & Vests/)
  })
})
