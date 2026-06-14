const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text).toMatch(/Found .* Patagonia store/i)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.stores is an array of stores', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    })

    test('each store has name, address, phone, and directions_url', async () => {
        const out = await handler({ location: 'Bristol' })
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

    test('returns error message when location is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/provide a location/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('returns empty results for unknown location', async () => {
        const out = await handler({ location: 'UnknownCityXYZ' })
        expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('filters stores by location query', async () => {
        const out = await handler({ location: 'Manchester' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBe(1)
        expect(stores[0].name).toBe('Patagonia Manchester')
    })
})
