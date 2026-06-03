const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ category: 'Fleece' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('products')
        expect(Array.isArray(out.structuredContent.products)).toBe(true)
    })

    test('"Show me some jackets" returns jacket products', async () => {
        const out = await handler({ category: 'Jackets & Vests' })
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
        expect(out.structuredContent.products.every(p => p.category === 'Jackets & Vests')).toBe(true)
        expect(out.content[0].text).toMatch(/Found \d+ products?/)
    })

    test('filters by gender correctly', async () => {
        const out = await handler({ gender: 'mens' })
        expect(out.structuredContent.products.length).toBeGreaterThan(0)
        expect(out.structuredContent.products.every(p => p.name.toLowerCase().includes("men's"))).toBe(true)
    })

    test('filters by category correctly', async () => {
        const out = await handler({ category: 'Fleece' })
        expect(out.structuredContent.products.length).toBe(1)
        expect(out.structuredContent.products[0].category).toBe('Fleece')
    })

    test('returns no results message when no matches found', async () => {
        const out = await handler({ category: 'Nonexistent Category' })
        expect(out.structuredContent.products.length).toBe(0)
        expect(out.content[0].text).toMatch(/No products found/i)
    })

    test('returns all products when no filters provided', async () => {
        const out = await handler({})
        expect(out.structuredContent.products.length).toBe(4)
        expect(out.content[0].text).toMatch(/Found 4 products/)
    })

    test('combines multiple filters correctly', async () => {
        const out = await handler({ category: 'Jackets & Vests', gender: 'mens' })
        expect(out.structuredContent.products.every(p => 
            p.category === 'Jackets & Vests' && p.name.toLowerCase().includes("men's")
        )).toBe(true)
    })
})