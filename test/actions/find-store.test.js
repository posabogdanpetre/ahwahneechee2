const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ location: 'Santa Monica' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Santa Monica' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.stores is an array', async () => {
        const out = await handler({ location: 'Santa Monica' })
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('returns error message when location is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/location|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('returns error message when location is empty string', async () => {
        const out = await handler({ location: '   ' })
        expect(out.content[0].text).toMatch(/location|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ location: 'Santa Monica' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found \d+ Patagonia/i)
    })

    test('returns no results for unknown location', async () => {
        const out = await handler({ location: 'Nonexistent City XYZ' })
        expect(out.structuredContent.stores).toEqual([])
        expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
    })

    test('filters stores by location substring match', async () => {
        const out = await handler({ location: 'Portland' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        expect(stores.some(s => s.address.includes('Portland') || s.name.includes('Portland'))).toBe(true)
    })

    test('each store has required properties', async () => {
        const out = await handler({ location: 'Santa Monica' })
        const stores = out.structuredContent.stores
        if (stores.length > 0) {
            const store = stores[0]
            expect(store).toHaveProperty('name')
            expect(store).toHaveProperty('address')
            expect(store).toHaveProperty('phone')
            expect(store).toHaveProperty('hours')
            expect(store).toHaveProperty('store_type')
        }
    })

    test('distinguishes between Patagonia Owned and Authorized Dealer', async () => {
        const out = await handler({ location: 'CA' })
        const stores = out.structuredContent.stores
        const storeTypes = [...new Set(stores.map(s => s.store_type))]
        expect(storeTypes.length).toBeGreaterThan(0)
        storeTypes.forEach(type => {
            expect(['Patagonia Owned', 'Authorized Dealer']).toContain(type)
        })
    })
})
