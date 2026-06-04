const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.stores is an array', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('returns error message when required country arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/country|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('filters by city when provided', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Manchester' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        expect(stores.every(s => s.address.toLowerCase().includes('manchester'))).toBe(true)
    })

    test('returns empty array for city with no stores', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Nowhere' })
        expect(out.structuredContent.stores).toEqual([])
        expect(out.content[0].text).toMatch(/no.*stores/i)
    })

    test('"Find a Patagonia store near me" returns stores with required fields', async () => {
        const out = await handler({ country: 'United Kingdom' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        stores.forEach(store => {
            expect(store).toHaveProperty('name')
            expect(store).toHaveProperty('address')
            expect(store).toHaveProperty('phone')
            expect(store).toHaveProperty('directions_url')
            expect(store.directions_url).toMatch(/^https:\/\/www\.google\.com\/maps\/dir/)
        })
    })

    test('generates valid Google Maps directions URLs', async () => {
        const out = await handler({ country: 'United Kingdom' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        const firstStore = stores[0]
        expect(firstStore.directions_url).toContain('destination=')
        expect(firstStore.directions_url).toContain(encodeURIComponent(firstStore.address))
    })
})
