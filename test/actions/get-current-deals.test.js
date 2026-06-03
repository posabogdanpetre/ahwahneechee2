const handler = require('../../actions/get-current-deals/index.js')

describe('get_current_deals handler', () => {
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
    })

    test('"What past-season deals are available?" returns all deals', async () => {
        const out = await handler({})
        expect(out.structuredContent.items.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found \d+ past-season deals/)
    })

    test('filters by category when provided', async () => {
        const out = await handler({ category: 'Jackets' })
        const items = out.structuredContent.items
        expect(items.every(item => item.category === 'Jackets')).toBe(true)
        expect(out.content[0].text).toMatch(/Jackets category/)
    })

    test('returns empty results for category with no matches', async () => {
        const out = await handler({ category: 'Swimwear' })
        expect(out.structuredContent.items.length).toBe(0)
        expect(out.content[0].text).toMatch(/Found 0 deals/)
    })

    test('each deal has required price and discount fields', async () => {
        const out = await handler({})
        const items = out.structuredContent.items
        items.forEach(item => {
            expect(item).toHaveProperty('name')
            expect(item).toHaveProperty('original_price')
            expect(item).toHaveProperty('sale_price')
            expect(item).toHaveProperty('discount_percentage')
            expect(item).toHaveProperty('category')
            expect(item).toHaveProperty('image_url')
            expect(typeof item.original_price).toBe('number')
            expect(typeof item.sale_price).toBe('number')
            expect(item.sale_price).toBeLessThan(item.original_price)
        })
    })
})