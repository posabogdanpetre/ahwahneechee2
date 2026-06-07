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

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/country|provide/i)
    })

    test('returns empty stores array when country is missing', async () => {
        const out = await handler({})
        expect(out.structuredContent.stores).toEqual([])
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    })

    test('each store has required fields including directions_url', async () => {
        const out = await handler({ country: 'United Kingdom' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        stores.forEach(store => {
            expect(store).toHaveProperty('name')
            expect(store).toHaveProperty('address')
            expect(store).toHaveProperty('phone')
            expect(store).toHaveProperty('directions_url')
            expect(store.directions_url).toMatch(/google\.com\/maps\/dir/)
        })
    })

    test('filters by city when provided', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Manchester' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBe(1)
        expect(stores[0].name).toBe('Patagonia Manchester')
    })

    test('returns empty array when city has no matching stores', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Edinburgh' })
        expect(out.structuredContent.stores).toEqual([])
        expect(out.content[0].text).toMatch(/0.*store/i)
    })

    test('content text mentions city when filtering by city', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Bristol' })
        expect(out.content[0].text).toMatch(/Bristol/i)
    })

    test('content text mentions country', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out.content[0].text).toMatch(/United Kingdom/i)
    })
})
