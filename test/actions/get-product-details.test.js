const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: "Women's Down Sweater Insulated Jacket" })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: "Women's Down Sweater Insulated Jacket" })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
    })

    test('"Tell me more about the Women\'s Down Sweater Insulated Jacket" returns product details', async () => {
        const out = await handler({ product_name: "Women's Down Sweater Insulated Jacket" })
        expect(out.structuredContent).toMatchObject({
            name: "Women's Down Sweater Insulated Jacket",
            price: "£230",
            category: "Women's Insulated Jackets"
        })
        expect(out.structuredContent.description).toContain('Lightweight')
        expect(out.structuredContent.image_url).toBeDefined()
    })

    test('returns no structuredContent when product is not found', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.content[0].text).toMatch(/No product found|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('lookup is case-insensitive', async () => {
        const out = await handler({ product_name: "men's textured fleece jacket" })
        expect(out.structuredContent).toMatchObject({
            name: "Men's Textured Fleece Jacket",
            price: "£150"
        })
    })
})