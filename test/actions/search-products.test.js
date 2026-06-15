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

    test('"Show me some outdoor jackets" returns jacket products', async () => {
        const out = await handler({ query: 'jacket' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every(p => p.name.toLowerCase().includes('jacket'))).toBe(true)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Men\'s Jackets' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every(p => p.category === 'Men\'s Jackets')).toBe(true)
    })

    test('filters by both query and category', async () => {
        const out = await handler({ query: 'torrentshell', category: 'Women\'s Jackets' })
        const products = out.structuredContent.products
        expect(products.length).toBe(1)
        expect(products[0].name).toBe('Women\'s Torrentshell 3L Rain Jacket')
    })

    test('returns empty array when no products match', async () => {
        const out = await handler({ query: 'nonexistent product' })
        const products = out.structuredContent.products
        expect(products.length).toBe(0)
        expect(out.content[0].text).toMatch(/no products found/i)
    })

    test('returns all products when no filters provided', async () => {
        const out = await handler({})
        const products = out.structuredContent.products
        expect(products.length).toBe(5)
    })

    test('query searches both name and description', async () => {
        const out = await handler({ query: 'waterproof' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.some(p => p.description.toLowerCase().includes('waterproof'))).toBe(true)
    })
})