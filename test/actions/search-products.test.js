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
        const out = await handler({})
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('"Show me some products" returns all products when no filters provided', async () => {
        const out = await handler({})
        expect(out.structuredContent.products.length).toBe(3)
        expect(out.content[0].text).toMatch(/Found 3 products/)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Fleece' })
        const products = out.structuredContent.products
        expect(products.length).toBe(1)
        expect(products[0].category).toBe('Fleece')
        expect(out.content[0].text).toMatch(/Found 1 product.*Fleece/)
    })

    test('filters by query string', async () => {
        const out = await handler({ query: 'rain' })
        const products = out.structuredContent.products
        expect(products.length).toBe(1)
        expect(products[0].name).toMatch(/Torrentshell/i)
        expect(out.content[0].text).toMatch(/Found 1 product.*matching "rain"/)
    })

    test('filters by both query and category', async () => {
        const out = await handler({ query: 'jacket', category: 'Fleece' })
        const products = out.structuredContent.products
        expect(products.length).toBe(1)
        expect(products[0].category).toBe('Fleece')
        expect(products[0].name).toMatch(/jacket/i)
    })

    test('returns empty array when no products match filters', async () => {
        const out = await handler({ query: 'nonexistent' })
        expect(out.structuredContent.products.length).toBe(0)
        expect(out.content[0].text).toMatch(/No products found.*matching "nonexistent"/)
    })

    test('returns empty array when category does not match any products', async () => {
        const out = await handler({ category: 'Swimwear' })
        expect(out.structuredContent.products.length).toBe(0)
        expect(out.content[0].text).toMatch(/No products found.*Swimwear/)
    })

    test('search is case-insensitive', async () => {
        const out = await handler({ query: 'JACKET' })
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
    })

    test('search matches product name, description, and category', async () => {
        const out = await handler({ query: 'recycled' })
        expect(out.structuredContent.products.length).toBe(2)
    })
})
