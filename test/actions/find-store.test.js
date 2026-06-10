const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ location: 'New York' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Chicago' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.stores contains store items', async () => {
        const out = await handler({ location: 'Portland' })
        expect(out.structuredContent.stores).toBeDefined()
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.structuredContent.stores[0]).toHaveProperty('name')
        expect(out.structuredContent.stores[0]).toHaveProperty('address')
    })

    test('returns error message when location is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/location|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('returns empty results when no stores match location', async () => {
        const out = await handler({ location: 'NonexistentCity' })
        expect(out.content[0].text).toMatch(/No.*stores found/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ location: 'New York' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found.*store/i)
    })

    test('filters stores by city name', async () => {
        const out = await handler({ location: 'Chicago' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        expect(stores.every(s => s.city.toLowerCase().includes('chicago'))).toBe(true)
    })
})
