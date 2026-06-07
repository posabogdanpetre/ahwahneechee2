const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Down Sweater' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text.length).toBeGreaterThan(0)
    })

    test('structuredContent.product is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Down Sweater' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('product')
        expect(typeof out.structuredContent.product).toBe('object')
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent.product).toBeNull()
    })

    test('returns error message when product_name is empty string', async () => {
        const out = await handler({ product_name: '   ' })
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent.product).toBeNull()
    })

    test('"Tell me more about the Down Sweater Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Down Sweater Jacket' })
        expect(out.structuredContent.product).not.toBeNull()
        expect(out.structuredContent.product.name).toMatch(/Down Sweater/i)
        expect(out.structuredContent.product.price).toBe(230)
        expect(out.structuredContent.product).toHaveProperty('description')
        expect(out.structuredContent.product).toHaveProperty('image_url')
        expect(out.content[0].text).toMatch(/Down Sweater/i)
    })

    test('returns null when product is not found', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.structuredContent.product).toBeNull()
        expect(out.content[0].text).toMatch(/No product found/i)
        expect(out.content[0].text).toContain('Nonexistent Product XYZ')
    })

    test('product details include all required fields from outputSchema', async () => {
        const out = await handler({ product_name: 'Better Sweater' })
        const product = out.structuredContent.product
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('price')
        expect(product).toHaveProperty('description')
        expect(product).toHaveProperty('materials')
        expect(product).toHaveProperty('weight')
        expect(product).toHaveProperty('fit')
        expect(product).toHaveProperty('colors')
        expect(product).toHaveProperty('rating')
        expect(product).toHaveProperty('review_count')
        expect(product).toHaveProperty('image_url')
        expect(Array.isArray(product.colors)).toBe(true)
        expect(typeof product.rating).toBe('number')
        expect(typeof product.review_count).toBe('number')
    })

    test('case-insensitive product name matching', async () => {
        const out1 = await handler({ product_name: 'torrentshell' })
        const out2 = await handler({ product_name: 'TORRENTSHELL' })
        const out3 = await handler({ product_name: 'Torrentshell' })
        
        expect(out1.structuredContent.product).not.toBeNull()
        expect(out2.structuredContent.product).not.toBeNull()
        expect(out3.structuredContent.product).not.toBeNull()
        expect(out1.structuredContent.product.name).toBe(out2.structuredContent.product.name)
        expect(out2.structuredContent.product.name).toBe(out3.structuredContent.product.name)
    })
})