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
        expect(out.structuredContent.items.length).toBeGreaterThan(0)
        expect(out.structuredContent.items.every(item => 
            item.name.toLowerCase().includes('jacket')
        )).toBe(true)
    })

    test('filters by category correctly', async () => {
        const out = await handler({ category: 'Fleece' })
        expect(out.structuredContent.items.length).toBeGreaterThan(0)
        expect(out.structuredContent.items.every(item => item.category === 'Fleece')).toBe(true)
    })

    test('filters by both query and category', async () => {
        const out = await handler({ query: 'jacket', category: 'Jackets & Vests' })
        expect(out.structuredContent.items.length).toBeGreaterThan(0)
        expect(out.structuredContent.items.every(item => 
            item.name.toLowerCase().includes('jacket') && item.category === 'Jackets & Vests'
        )).toBe(true)
    })

    test('returns empty results for non-matching query', async () => {
        const out = await handler({ query: 'nonexistent-product-xyz' })
        expect(out.structuredContent.items.length).toBe(0)
        expect(out.content[0].text).toMatch(/no products found/i)
    })

    test('returns all products when no filters provided', async () => {
        const out = await handler({})
        expect(out.structuredContent.items.length).toBe(5)
        expect(out.content[0].text).toMatch(/found 5 products/i)
    })

    test('each product has required fields', async () => {
        const out = await handler({})
        const item = out.structuredContent.items[0]
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('price')
        expect(item).toHaveProperty('category')
        expect(item).toHaveProperty('image_url')
        expect(item).toHaveProperty('product_id')
        expect(item).toHaveProperty('colors_available')
    })
})
