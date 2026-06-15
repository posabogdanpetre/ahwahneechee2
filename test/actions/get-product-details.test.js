const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
  test('"Tell me more about the Men\'s Torrentshell 3L Rain Jacket" returns product details', async () => {
    const out = await handler({ product_name: "Men's Torrentshell 3L Rain Jacket" })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    expect(out.content[0].text).toContain("Men's Torrentshell 3L Rain Jacket")
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ product_name: "Men's Torrentshell 3L Rain Jacket" })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent contains expected product fields', async () => {
    const out = await handler({ product_name: "Men's Torrentshell 3L Rain Jacket" })
    expect(out.structuredContent).toHaveProperty('name')
    expect(out.structuredContent).toHaveProperty('description')
    expect(out.structuredContent).toHaveProperty('price')
    expect(out.structuredContent).toHaveProperty('category')
    expect(out.structuredContent).toHaveProperty('image_url')
    expect(out.structuredContent.name).toBe("Men's Torrentshell 3L Rain Jacket")
  })

  test('returns error message when product_name is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent).toBeUndefined()
  })

  test('returns error message when product_name is empty string', async () => {
    const out = await handler({ product_name: '' })
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent).toBeUndefined()
  })

  test('returns not found message for unknown product', async () => {
    const out = await handler({ product_name: 'Nonexistent Product XYZ' })
    expect(out.content[0].text).toMatch(/No product found|Nonexistent Product XYZ/i)
    expect(out.structuredContent).toBeUndefined()
  })

  test('lookup is case-insensitive', async () => {
    const out = await handler({ product_name: "men's torrentshell 3l rain jacket" })
    expect(out.structuredContent).toBeDefined()
    expect(out.structuredContent.name).toBe("Men's Torrentshell 3L Rain Jacket")
  })
})
