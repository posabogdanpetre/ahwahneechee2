const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ product_name: 'Nano Puff' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    expect(out.content[0].text).toMatch(/Nano Puff/)
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ product_name: 'Nano Puff' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.product contains expected fields', async () => {
    const out = await handler({ product_name: 'Nano Puff' })
    expect(out.structuredContent.product).toHaveProperty('name')
    expect(out.structuredContent.product).toHaveProperty('price')
    expect(out.structuredContent.product).toHaveProperty('description')
    expect(out.structuredContent.product).toHaveProperty('materials')
    expect(out.structuredContent.product).toHaveProperty('available_sizes')
    expect(Array.isArray(out.structuredContent.product.available_sizes)).toBe(true)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/product_name|provide/i)
    expect(out.structuredContent.product).toBeNull()
  })

  test('"Tell me more about the Nano Puff Jacket" returns product details', async () => {
    const out = await handler({ product_name: 'Nano Puff Jacket' })
    expect(out.structuredContent.product).not.toBeNull()
    expect(out.structuredContent.product.name).toMatch(/Nano Puff/i)
    expect(out.content[0].text).toMatch(/Nano Puff/)
    expect(out.content[0].text).toMatch(/£/)
  })

  test('returns null when product is not found', async () => {
    const out = await handler({ product_name: 'NonExistentProduct12345' })
    expect(out.content[0].text).toMatch(/No product found/i)
    expect(out.structuredContent.product).toBeNull()
  })

  test('case-insensitive matching finds product', async () => {
    const out = await handler({ product_name: 'down sweater' })
    expect(out.structuredContent.product).not.toBeNull()
    expect(out.structuredContent.product.name).toMatch(/Down Sweater/i)
  })
})
