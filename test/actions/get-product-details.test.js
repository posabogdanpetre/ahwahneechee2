const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: "Men's Triolet Alpine Jacket" })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text).toContain('Triolet Alpine Jacket')
    })

    test('structuredContent is a plain object with product fields, not a bare array', async () => {
        const out = await handler({ product_name: "Men's Triolet Alpine Jacket" })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('name')
        expect(out.structuredContent).toHaveProperty('description')
        expect(out.structuredContent).toHaveProperty('price')
        expect(out.structuredContent).toHaveProperty('materials')
        expect(out.structuredContent).toHaveProperty('sustainability')
    })

    test('returns error message when product_name is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out).not.toHaveProperty('structuredContent')
    })

    test('"Tell me more about the Men\'s Triolet Alpine Jacket" returns product details', async () => {
        const out = await handler({ product_name: "Men's Triolet Alpine Jacket" })
        expect(out.structuredContent.name).toBe("Men's Triolet Alpine Jacket")
        expect(out.structuredContent.price).toBe(370)
        expect(out.structuredContent.category).toBe("Men's Jackets")
        expect(Array.isArray(out.structuredContent.available_colors)).toBe(true)
        expect(Array.isArray(out.structuredContent.available_sizes)).toBe(true)
    })

    test('returns not found message for unknown product', async () => {
        const out = await handler({ product_name: 'Non-existent Product XYZ' })
        expect(out.content[0].text).toMatch(/no results|not found/i)
        expect(out).not.toHaveProperty('structuredContent')
    })

    test('case-insensitive product name matching', async () => {
        const out = await handler({ product_name: "women's better sweater fleece jacket" })
        expect(out.structuredContent.name).toBe("Women's Better Sweater Fleece Jacket")
        expect(out.structuredContent.price).toBe(130)
    })
})