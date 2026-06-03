const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Nano Puff Jacket' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Nano Puff Jacket' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.item has expected product fields', async () => {
        const out = await handler({ product_name: 'Nano Puff' })
        const item = out.structuredContent.item
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('description')
        expect(item).toHaveProperty('price')
        expect(item).toHaveProperty('category')
        expect(item).toHaveProperty('colors')
        expect(item).toHaveProperty('sizes')
        expect(item).toHaveProperty('image_url')
        expect(item).toHaveProperty('materials')
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent.item).toBeNull()
    })

    test('returns null item when product not found', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.content[0].text).toMatch(/no product found|nonexistent/i)
        expect(out.structuredContent.item).toBeNull()
    })

    test('"Tell me more about the Nano Puff Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Nano Puff Jacket' })
        expect(out.structuredContent.item).not.toBeNull()
        expect(out.structuredContent.item.name).toMatch(/Nano Puff/i)
        expect(out.structuredContent.item.price).toBeTruthy()
        expect(out.content[0].text).toMatch(/Nano Puff/i)
    })

    test('partial product name match works', async () => {
        const out = await handler({ product_name: 'Better Sweater' })
        expect(out.structuredContent.item).not.toBeNull()
        expect(out.structuredContent.item.name).toMatch(/Better Sweater/i)
    })
})