const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('"Show me some outdoor jackets" returns product results', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text).toMatch(/product/i)
    })

    test('returns content block shape on happy path', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('products')
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('filters by category when provided', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every(p => p.category === 'Jackets & Vests')).toBe(true)
        expect(out.content[0].text).toMatch(/Jackets & Vests/i)
    })

    test('returns all products when no filters applied', async () => {
        const out = await handler({})
        const products = out.structuredContent.products
        expect(products.length).toBe(5)
        expect(out.content[0].text).toMatch(/Found 5 products/i)
    })

    test('returns empty results for unknown category', async () => {
        const out = await handler({ category: 'Unknown Category' })
        const products = out.structuredContent.products
        expect(products.length).toBe(0)
        expect(out.content[0].text).toMatch(/No products found/i)
    })

    test('all products have required fields', async () => {
        const out = await handler({})
        const products = out.structuredContent.products
        products.forEach(product => {
            expect(product).toHaveProperty('name')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('category')
            expect(product).toHaveProperty('description')
        })
    })
})