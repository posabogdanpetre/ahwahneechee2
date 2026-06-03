const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('"Tell me more about the Better Sweater Fleece Jacket" returns product details', async () => {
        const out = await handler({ product_name: 'Better Sweater Fleece Jacket' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text).toMatch(/Better Sweater Fleece Jacket/i)
    })

    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Micro D Fleece' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text).toContain('Micro D Fleece Jacket')
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Better Sweater' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('product')
    })

    test('structuredContent.product matches output schema', async () => {
        const out = await handler({ product_name: 'Black Hole Duffel' })
        const product = out.structuredContent.product
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('description')
        expect(product).toHaveProperty('price')
        expect(product).toHaveProperty('category')
        expect(product).toHaveProperty('materials')
        expect(product).toHaveProperty('colors')
        expect(product).toHaveProperty('image_url')
        expect(typeof product.price).toBe('number')
        expect(Array.isArray(product.colors)).toBe(true)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent.product).toBeNull()
    })

    test('returns error message when product_name is empty string', async () => {
        const out = await handler({ product_name: '   ' })
        expect(out.content[0].text).toMatch(/provide/i)
        expect(out.structuredContent.product).toBeNull()
    })

    test('returns no results when product not found', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.content[0].text).toMatch(/no product found/i)
        expect(out.structuredContent.product).toBeNull()
    })

    test('case-insensitive product name matching', async () => {
        const out = await handler({ product_name: 'better sweater fleece jacket' })
        expect(out.structuredContent.product).not.toBeNull()
        expect(out.structuredContent.product.name).toContain('Better Sweater Fleece Jacket')
    })

    test('partial product name matching works', async () => {
        const out = await handler({ product_name: 'Micro D' })
        expect(out.structuredContent.product).not.toBeNull()
        expect(out.structuredContent.product.name).toContain('Micro D Fleece Jacket')
    })
})
