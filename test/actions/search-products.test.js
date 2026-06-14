const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ query: 'jacket' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ query: 'jacket' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.products is an array', async () => {
        const out = await handler({ query: 'jacket' })
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('"Show me some Patagonia jackets" returns jacket products', async () => {
        const out = await handler({ query: 'jacket' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every(p => p.name.toLowerCase().includes('jacket'))).toBe(true)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Fleece' })
        const products = out.structuredContent.products
        expect(products.every(p => p.category === 'Fleece')).toBe(true)
        expect(products.length).toBeGreaterThan(0)
    })

    test('filters by both query and category', async () => {
        const out = await handler({ query: 'sweater', category: 'Fleece' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every(p => p.category === 'Fleece' && p.name.toLowerCase().includes('sweater'))).toBe(true)
    })

    test('returns empty array when no products match query', async () => {
        const out = await handler({ query: 'nonexistent-product-xyz' })
        expect(out.content[0].text).toMatch(/Found 0 products/i)
        expect(out.structuredContent.products).toEqual([])
    })

    test('returns all products when no filters are applied', async () => {
        const out = await handler({})
        const products = out.structuredContent.products
        expect(products.length).toBe(6)
        expect(out.content[0].text).toMatch(/Found 6 products in the Patagonia catalog/i)
    })
})