const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Nano Puff' })
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

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent.item).toBeNull()
    })

    test('"Tell me more about the Nano Puff Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Nano Puff' })
        expect(out.structuredContent.name).toContain('Nano Puff')
        expect(out.structuredContent.description).toBeTruthy()
        expect(out.structuredContent.price).toBeDefined()
        expect(out.structuredContent.category).toBeTruthy()
        expect(out.structuredContent.image_url).toBeTruthy()
    })

    test('returns null item when product not found', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.content[0].text).toMatch(/no product found/i)
        expect(out.structuredContent.item).toBeNull()
    })

    test('partial name match works (case-insensitive)', async () => {
        const out = await handler({ product_name: 'houdini' })
        expect(out.structuredContent.name).toContain('Houdini')
        expect(out.structuredContent.category).toBe('Windbreakers')
    })

    test('price is converted to number in structuredContent', async () => {
        const out = await handler({ product_name: 'Down Sweater' })
        expect(typeof out.structuredContent.price).toBe('number')
        expect(out.structuredContent.price).toBe(230)
    })

    test('includes all required output schema fields', async () => {
        const out = await handler({ product_name: 'Torrentshell' })
        expect(out.structuredContent).toHaveProperty('name')
        expect(out.structuredContent).toHaveProperty('description')
        expect(out.structuredContent).toHaveProperty('price')
        expect(out.structuredContent).toHaveProperty('category')
        expect(out.structuredContent).toHaveProperty('image_url')
        expect(out.structuredContent).toHaveProperty('materials')
        expect(out.structuredContent).toHaveProperty('features')
        expect(out.structuredContent).toHaveProperty('colors')
        expect(out.structuredContent).toHaveProperty('sizes')
    })
})