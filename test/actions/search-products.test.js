const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.products is an array', async () => {
        const out = await handler({})
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('"Show me some outdoor jackets" returns jacket products', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found \d+ products? in Jackets & Vests/)
    })

    test('returns all products when no filters are applied', async () => {
        const out = await handler({})
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found \d+ products?\./)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        const products = out.structuredContent.products
        expect(products.every(p => p.category === 'Jackets & Vests')).toBe(true)
    })

    test('returns empty array when no products match filter', async () => {
        const out = await handler({ category: 'Wetsuits' })
        expect(out.structuredContent.products).toEqual([])
        expect(out.content[0].text).toMatch(/No products found/)
    })

    test('each product has required fields', async () => {
        const out = await handler({})
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        products.forEach(product => {
            expect(product).toHaveProperty('name')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('category')
            expect(product).toHaveProperty('image_url')
            expect(product).toHaveProperty('color_options')
        })
    })
})