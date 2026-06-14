const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: "Men's Classic Retro-X Fleece Jacket" })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: "Men's Classic Retro-X Fleece Jacket" })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent contains all expected product detail fields', async () => {
        const out = await handler({ product_name: "Men's Classic Retro-X Fleece Jacket" })
        expect(out.structuredContent).toMatchObject({
            name: expect.any(String),
            price: expect.any(String),
            description: expect.any(String),
            materials: expect.any(String),
            weight: expect.any(String),
            colors: expect.any(Array),
            rating: expect.any(Number),
            review_count: expect.any(Number),
            certifications: expect.any(Array),
            image_url: expect.any(String)
        })
    })

    test('returns error message when product_name is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('returns error message when product_name is empty string', async () => {
        const out = await handler({ product_name: '   ' })
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('"Tell me more about the Men\'s Classic Retro-X Fleece Jacket" returns correct product details', async () => {
        const out = await handler({ product_name: "Men's Classic Retro-X Fleece Jacket" })
        expect(out.structuredContent.name).toBe("Men's Classic Retro-X Fleece Jacket")
        expect(out.structuredContent.price).toBe("£220")
        expect(out.content[0].text).toMatch(/Men's Classic Retro-X Fleece Jacket/i)
    })

    test('returns not found message for unknown product', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.content[0].text).toMatch(/No product found|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('product lookup is case-insensitive', async () => {
        const out = await handler({ product_name: "men's classic retro-x fleece jacket" })
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe("Men's Classic Retro-X Fleece Jacket")
    })

    test('returns correct details for Airfarer Cap', async () => {
        const out = await handler({ product_name: 'Airfarer Cap' })
        expect(out.structuredContent.name).toBe('Airfarer Cap')
        expect(out.structuredContent.price).toBe('£40')
        expect(out.structuredContent.certifications).toContain('NetPlus')
    })
})
